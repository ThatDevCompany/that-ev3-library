import {EventNotificationRequest} from './EventNotificationRequest';
import * as fs from 'fs';
import * as path from 'path';

export class Device {
    public static overrideSysClassDir: string = null;

    private static eventTimerInterval = 50;

    public deviceRoot: string;
    public deviceDirName: string;
    public connected: boolean = false;

    private sysClassDir: string = '/sys/class';

    private pendingEventRequests: EventNotificationRequest[] = [];
    private eventTimerCancellationToken: NodeJS.Timer = null;

    public connect(driverName: string, nameConvention?: string, propertyConstraints?: { [propertyName: string]: any }) {
        const nameRegex = nameConvention ? new RegExp(nameConvention) : undefined;

        const deviceSearchDir = path.join(Device.overrideSysClassDir || this.sysClassDir, driverName);

        let availableDevices: string[];
        try {
            availableDevices = fs.readdirSync(deviceSearchDir);
        } catch (error) {
            return;
        }

        for (const deviceDirIndex in availableDevices) {
            const currentDeviceDirName = availableDevices[deviceDirIndex];

            if (nameRegex !== undefined && !nameRegex.test(currentDeviceDirName)) {
                continue;
            }

            const currentDeviceDir = path.join(deviceSearchDir, currentDeviceDirName);

            let satisfiesConstraints: boolean = true;
            if (propertyConstraints !== undefined) {
                for (const propName in propertyConstraints) {
                    const propertyValue = this.readProperty(propName, currentDeviceDir);
                    const constraintValue = propertyConstraints[propName];

                    if (constraintValue instanceof Array) {
                        if (constraintValue.indexOf(propertyValue) === -1) {
                            satisfiesConstraints = false;
                        }
                    } else if (propertyValue !== constraintValue) {
                        satisfiesConstraints = false;
                    }
                }
            }

            if (!satisfiesConstraints) {
                continue;
            }

            this.deviceRoot = currentDeviceDir;
            this.deviceDirName = currentDeviceDirName;
            this.connected = true;
        }
    }

    public readNumber(property: string, deviceRoot?: string): number {
        const value = this.readProperty(property, deviceRoot);

        if (typeof value !== 'number') {
            return NaN;
        }

        return value;
    }

    public readString(property: string, deviceRoot?: string): string {
        const value = this.readProperty(property, deviceRoot);
        return String(value);
    }

    public readStringAsType<T>(property: string, deviceRoot?: string): T {
        return <any>this.readString(property, deviceRoot) as T;
    }

    public readStringArray(property: string, deviceRoot?: string): string[] {
        return this.readString(property, deviceRoot)
            .split(' ')
            .map((value: string) => value.replace(/^\[|\]$/g, ''));
    }

    public readStringArrayAsType<T>(property: string, deviceRoot?: string): T[] {
        return <any>this.readStringArray(property, deviceRoot) as T[];
    }

    public readStringSelector(property: string, deviceRoot?: string): string {
        const bracketedParts = this.readString(property, deviceRoot)
            .split(' ')
            .filter((value: string) => value.match(/^\[|\]$/g) != null);

        if (bracketedParts.length <= 0) {
            return null;
        }

        return bracketedParts[0].replace(/^\[|\]$/g, '');
    }

    public readProperty(property: string, deviceRoot?: string): any {
        if (!deviceRoot && !this.connected) {
            throw new Error('You must be connected to a device before you can read from it. This error probably means that the target device was not found.');
        }

        let rawValue: string;
        const propertyPath = this.constructPropertyPath(property, deviceRoot);

        try {
            rawValue = fs.readFileSync(propertyPath).toString();
        } catch (e) {
            console.error(e);
            throw new Error('There was an error while reading from the property file ' + propertyPath);
        }

        rawValue = rawValue.trim();
        const numValue = Number(rawValue);

        if (isNaN(numValue)) {
            return rawValue;
        } else {
            return numValue;
        }
    }

    public setProperty(property: string, value: any): any {
        if (!this.connected) {
            throw new Error('You must be connected to a device before you can write to it. This error probably means that the target device was not found.');
        }

        const propertyPath = this.constructPropertyPath(property);

        try {
            fs.writeFileSync(propertyPath, value.toString());
        } catch (e) {
            console.error(e);
            throw new Error('There was an error while writing to the property file ' + propertyPath);
        }
    }

    public setNumber(property: string, value: number) {
        this.setProperty(property, value);
    }

    public setString(property: string, value: string) {
        this.setProperty(property, value);
    }

    public set(propertyDefs: any) {
        for (const key in propertyDefs) {
            this.setProperty(key, propertyDefs[key]);
        }
    }

    public registerEventCallback(
        callbackFunction: (err?: Error, userData?: any) => void,
        eventPredicate: (userData?: any) => boolean,
        firstTriggerOnly: boolean = false,
        userCallbackData?: any) {

        const newEventRequest: EventNotificationRequest = new EventNotificationRequest(
            (err?) => {
                callbackFunction(err, userCallbackData);
            }, eventPredicate, firstTriggerOnly, userCallbackData);

        this.pendingEventRequests.push(newEventRequest);
        this.updateEventTimerState();
    }

    public registerEventPromise(eventPredicate: (userData?: any) => boolean, userCallbackData?: any): Promise<any> {
        if (Promise == null) {
            throw new Error('Promises are currently unavailable. Install the \'bluebird\' package or use \'registerEventCallback(...)\' instead.');
        }

        return new Promise((resolve, reject) => {
            this.registerEventCallback((err?) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(userCallbackData);
                }

            }, eventPredicate, true, userCallbackData);
        });
    }

    protected constructPropertyPath(property: string, deviceRoot?: string) {
        return path.join(deviceRoot || this.deviceRoot, property);
    }

    private updatePendingEventRequests() {
        this.pendingEventRequests = this.pendingEventRequests.filter(
            (eventRequest, index, arr) =>
                eventRequest.handleUpdate());

        this.updateEventTimerState();
    }

    private updateEventTimerState() {
        if (this.pendingEventRequests.length > 0 && this.eventTimerCancellationToken == null) {
            this.eventTimerCancellationToken = setInterval(() => this.updatePendingEventRequests(), Device.eventTimerInterval);
        } else if (this.pendingEventRequests.length <= 0 && this.eventTimerCancellationToken != null) {
            clearInterval(this.eventTimerCancellationToken);
            this.eventTimerCancellationToken = null;
        }
    }
}

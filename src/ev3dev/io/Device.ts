import {EventHandler} from './EventHandler';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Base device class for all hardware devices
 */
export class Device {
    protected _deviceRoot: string;
    protected _deviceDirName: string;
    protected _clockSpeed = 50;
    protected _overrideSysClassDir: string = null;
    protected _sysClassDir: string = '/sys/class';
    protected _handlers: Array<EventHandler> = [];
    protected _clock: NodeJS.Timer = null;

    protected _connected: boolean = false;

    /**
     * Returns true if the device has been successfully connected
     */
    get connected(): boolean {
        return this._connected;
    }

    /**
     * Connect to the hardware device
     */
    connect(driverName: string, nameConvention?: string, propertyConstraints?: { [propertyName: string]: any }) {
        const nameRegex = nameConvention ? new RegExp(nameConvention) : undefined;

        const deviceSearchDir = path.join(this._overrideSysClassDir || this._sysClassDir, driverName);

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

            this._deviceRoot = currentDeviceDir;
            this._deviceDirName = currentDeviceDirName;
            this._connected = true;
        }
    }

    /**
     * Read a property value from the device, and return it as a STRING
     */
    readProperty(property: string, deviceRoot?: string): string {
        if (!deviceRoot && !this._connected) {
            throw new Error('You must be connected to a device before you can read from it. This error probably means that the target device was not found.');
        }
        const propertyPath = this.constructPropertyPath(property, deviceRoot);

        // Try and return the value
        try {
            return fs.readFileSync(propertyPath).toString();

            // Catch and throw any errors
        } catch (e) {
            console.error(e);
            throw new Error('There was an error while reading from the property file ' + propertyPath);

        }

    }

    /**
     * Read a property value from the device, and return it as a NUMBER
     */
    readPropertyAsNumber(property: string, deviceRoot?: string): number {
        return Number(this.readProperty(property, deviceRoot));
    }

    /**
     * Read a property value from the device, and return it as ARRAY<STRING>
     */
    readPropertyAsArray(property: string, deviceRoot?: string): Array<string> {
        return this.readProperty(property, deviceRoot)
            .split(' ')
            .map((value: string) => value.replace(/^\[|\]$/g, ''));
    }

    /**
     * Read a property value from the device, and return it as a string selector ???
     */
    readPropertyAsSelector(property: string, deviceRoot?: string): string {
        const bracketedParts = this.readProperty(property, deviceRoot)
            .split(' ')
            .filter((value: string) => value.match(/^\[|\]$/g) != null);

        if (bracketedParts.length <= 0) {
            return null;
        }

        return bracketedParts[0].replace(/^\[|\]$/g, '');
    }

    /**
     * Set the raw value from the property (from a STRING)
     */
    setProperty(property: string, value: string) {
        if (!this._connected) {
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

    /**
     * Set the value of the property from a number
     */
    setPropertyFromNumber(property: string, value: number) {
        this.setProperty(property, value + '');
    }

    /**
     * Set a bunch of properties from a JSON object
     */
    setProperties(propertyDefs: any) {
        for (const key in propertyDefs) {
            this.setProperty(key, propertyDefs[key]);
        }
    }

    /**
     * Register a callback function to a property change event
     */
    registerHandler(handler: EventHandler) {
        this._handlers.push(handler);
        this.updateClock();
    }

    /**
     * Returns the full sysfs path for a given property
     */
    protected constructPropertyPath(property: string, deviceRoot?: string) {
        return path.join(deviceRoot || this._deviceRoot, property);
    }

    /**
     * Process the clock tick
     */
    protected tick() {
        this._handlers = this._handlers.filter(handler => handler.update());
        this.updateClock();
    }

    /**
     * Update the state of the event time
     */
    protected updateClock() {

        // If anyone is handling events and we have no ticking clock, start one
        if (this._handlers.length && !this._clock) {
            this._clock = setInterval(
                () => this.tick(),
                this._clockSpeed
            );

            // If noone is handling events and we have a ticking clock, stop it
        } else if (!this._handlers.length && this._clock) {
            clearInterval(this._clock);
            this._clock = null;

        }
    }
}

import {Device} from './Device';

export class IndexedDevice extends Device {
    protected deviceIndexRegex = new RegExp('(\\d+)', 'g');

    constructor(driverTypeDirName: string, nameConvention?: string, targetAddress?: string, targetDriverName?: string | string[]) {
        super();

        const propertyConstraints: { [propertyName: string]: any } = {};

        if (targetAddress !== undefined) {
            propertyConstraints['address'] = targetAddress;
        }

        if (targetDriverName !== undefined) {
            propertyConstraints['driver_name'] = [].concat(targetDriverName);
        }

        this.connect(driverTypeDirName, nameConvention, propertyConstraints);

        if (this.connected) {
            const matches = this.deviceIndexRegex.exec(this.deviceDirName);

            if (matches != null && matches[0] !== undefined) {
                this._deviceIndex = Number(matches[1]);
            }
        }
    }

    protected _deviceIndex: number = -1;

    get deviceIndex(): number {
        return this._deviceIndex;
    }
}

import {Device} from '../io';

/**
 * A generic interface to read data from the system's power_supply class.
 * Uses the built-in legoev3-battery if none is specified.
 */
export class PowerSupply extends Device {
    public deviceName;

    constructor(deviceName: string) {
        super();

        let deviceConstraints = {};
        if (deviceName === undefined) {
            deviceConstraints['scope'] = 'System';
        } else {
            this.deviceName = deviceName;
        }

        this.connect('power_supply', deviceName, deviceConstraints);
    }

    /**
     * The measured current that the battery is supplying (in microamps)
     */
    get measuredCurrent(): number {
        return this.readNumber('current_now');
    }

    /**
     * The measured voltage that the battery is supplying (in microvolts)
     */
    get measuredVoltage(): number {
        return this.readNumber('voltage_now');
    }

    /**
     */
    get maxVoltage(): number {
        return this.readNumber('voltage_max_design');
    }

    /**
     */
    get minVoltage(): number {
        return this.readNumber('voltage_min_design');
    }

    /**
     */
    get technology(): string {
        return this.readString('technology');
    }

    /**
     */
    get type(): string {
        return this.readString('type');
    }

    get voltageVolts(): number {
        return this.measuredVoltage / 1000000;
    }

    get currentAmps(): number {
        return this.measuredCurrent / 1000000;
    }

}

import {Device} from '../io';

/**
 * A generic interface to read data from the system's power_supply class.
 * Uses the built-in legoev3-battery if none is specified.
 */
export class PowerSupply extends Device {
    /**
     * Constructor
     */
    constructor(public deviceName: string) {
        super();
        this.connect('power_supply', deviceName, (!deviceName) ? { scope: 'System' } : {});
    }

    /**
     * The current that the battery is supplying (in amps)
     */
    get current(): number {
        return this.readPropertyAsNumber('current_now') / 1000000;
    }

    /**
     * The voltage that the battery is supplying (in volts)
     */
    get voltage(): number {
        return this.readPropertyAsNumber('voltage_now') / 1000000;
    }

    /**
     * The maximum voltage (in volts)
     */
    get maxVoltage(): number {
        return this.readPropertyAsNumber('voltage_max_design') / 1000000;
    }

    /**
     * The minimum voltage (in volts)
     */
    get minVoltage(): number {
        return this.readPropertyAsNumber('voltage_min_design') / 1000000;
    }

    /**
     * The name of the tech
     */
    get technology(): string {
        return this.readProperty('technology');
    }

    /**
     * The type of the powersupply
     */
    get type(): string {
        return this.readProperty('type');
    }
}

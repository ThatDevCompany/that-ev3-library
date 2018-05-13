import {IndexedDevice} from '../io';

/**
 * The sensor class provides a uniform interface for using most of the
 * sensors available for the EV3. The various underlying device drivers will
 * create a `lego-sensor` device for interacting with the sensors.
 *
 * Sensors are primarily controlled by setting the `mode` and monitored by
 * reading the `value<N>` attributes. Values can be converted to floating point
 * if needed by `value<N>` / 10.0 ^ `decimals`.
 *
 * Since the name of the `sensor<N>` device node does not correspond to the port
 * that a sensor is plugged in to, you must look at the `address` attribute if
 * you need to know which port a sensor is plugged in to. However, if you don't
 * have more than one sensor of each type, you can just look for a matching
 * `driver_name`. Then it will not matter which port a sensor is plugged in to - your
 * program will still work.
 */
export class Sensor extends IndexedDevice {

    /**
     * Constructor
     */
    constructor(port?: string, driverNames?: string[] | string) {
        super('lego-sensor', 'sensor(\\d*)', port, driverNames);
    }

    /**
     * Returns the name of the sensor device/driver. See the list of [supported
     * sensors] for a complete list of drivers.
     */
    get driverName(): string {
        return this.readProperty('driver_name');
    }

    /**
     * Returns the name of the port that the sensor is connected to, e.g. `ev3:in1`.
     * I2C sensors also include the I2C address (decimal), e.g. `ev3:in1:i2c8`.
     */
    get address(): string {
        return this.readProperty('address');
    }

    /**
     * Returns the units of the measured value for the current mode. May return
     * empty string
     */
    protected get units(): string {
        return this.readProperty('units');
    }

    /**
     * Returns the current mode. Writing one of the values returned by `modes`
     * sets the sensor to that mode.
     */
    protected get mode(): string {
        return this.readProperty('mode');
    }
    protected set mode(value: string) {
        this.setProperty('mode', value);
    }

    /**
     * Sends a command to the sensor.
     */
    protected set command(value: string) {
        this.setProperty('command', value);
    }

    /**
     * Returns a list of the valid commands for the sensor.
     * Returns -EOPNOTSUPP if no commands are supported.
     */
    protected get commands(): string[] {
        return this.readPropertyAsArray('commands');
    }

    /**
     * Returns a list of the valid modes for the sensor.
     */
    protected get modes(): string[] {
        return this.readPropertyAsArray('modes');
    }

    /**
     * Returns the number of `value<N>` attributes that will return a valid value
     * for the current mode.
     */
    protected get numValues(): number {
        return this.readPropertyAsNumber('num_values');
    }

    /**
     * Returns the number of decimal places for the values in the `value<N>`
     * attributes of the current mode.
     */
    protected get decimals(): number {
        return this.readPropertyAsNumber('decimals');
    }

    protected getValue(valueIndex: number): number {
        return this.readPropertyAsNumber('value' + valueIndex);
    }

}

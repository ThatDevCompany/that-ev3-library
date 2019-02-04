import { Sensor } from './Sensor'

/**
 * A generic interface to control I2C-type EV3 sensors.
 */
export class I2CSensor extends Sensor {
	/**
	 * Constructor
	 */
	constructor(port?: string, driverNames?: string[]) {
		super(port, driverNames)
	}

	/**
	 * Returns the firmware version of the sensor if available. Currently only
	 * I2C/NXT sensors support this.
	 */
	get fwVersion(): string {
		return this.readProperty('fw_version')
	}

	/**
	 * Returns the polling period of the sensor in milliseconds. Writing sets the
	 * polling period. Setting to 0 disables polling. Minimum value is hard
	 * coded as 50 msec. Returns -EOPNOTSUPP if changing polling is not supported.
	 * Currently only I2C/NXT sensors support changing the polling period.
	 */
	get pollMs(): number {
		return this.readPropertyAsNumber('poll_ms')
	}

	set pollMs(value: number) {
		this.setPropertyFromNumber('poll_ms', value)
	}
}

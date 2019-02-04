import { Sensor } from './Sensor'

/**
 * LEGO EV3 gyro sensor.
 */
export class GyroSensor extends Sensor {
	/**
	 * Constructor
	 */
	constructor(port?: string) {
		super(port, ['lego-ev3-gyro'])
	}

	/**
	 * The number of degrees that the sensor has been rotated
	 * since it was put into this mode.
	 */
	get angle(): number {
		this.mode = 'GYRO-ANG'
		return this.getValue(0)
	}

	/**
	 * The rate at which the sensor is rotating, in degrees/second.
	 */
	get rate(): number {
		this.mode = 'GYRO-RATE'
		return this.getValue(0)
	}
}

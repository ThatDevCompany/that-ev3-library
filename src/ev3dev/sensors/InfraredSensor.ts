import { Sensor } from './Sensor'

/**
 * LEGO EV3 infrared sensor.
 */
export class InfraredSensor extends Sensor {
	/**
	 * Constructor
	 */
	constructor(port?: string) {
		super(port, ['lego-ev3-ir'])
	}

	/**
	 * A measurement of the distance between the sensor and the remote,
	 * as a percentage. 100% is approximately 70cm/27in.
	 */
	get proximity(): number {
		this.mode = 'IR-PROX'
		return this.getValue(0)
	}
}

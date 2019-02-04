import { Sensor } from './Sensor'

/**
 * LEGO NXT Sound Sensor
 */
export class SoundSensor extends Sensor {
	/**
	 * Constructor
	 */
	constructor(port?: string) {
		super(port, ['lego-nxt-sound'])
	}

	/**
	 * A measurement of the measured sound pressure level, as a
	 * percent. Uses a flat weighting.
	 */
	get soundPressure(): number {
		this.mode = 'DB'
		return this.getValue(0)
	}

	/**
	 * A measurement of the measured sound pressure level, as a
	 * percent. Uses A-weighting, which focuses on levels up to 55 dB.
	 */
	get soundPressureLow(): number {
		this.mode = 'DBA'
		return this.getValue(0)
	}
}

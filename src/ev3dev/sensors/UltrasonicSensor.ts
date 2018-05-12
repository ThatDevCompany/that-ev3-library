import {Sensor} from './Sensor';

/**
 * LEGO EV3 ultrasonic sensor.
 */
export class UltrasonicSensor extends Sensor {
    constructor(port?: string) {
        super(port, ['lego-ev3-us', 'lego-nxt-us']);
    }

    /**
     * Measurement of the distance detected by the sensor,
     * in centimeters.
     */
    get distanceCentimeters(): number {
        this.mode = 'US-DIST-CM';
        return Number(this.getFloatValue(0));
    }

    /**
     * Measurement of the distance detected by the sensor,
     * in inches.
     */
    get distanceInches(): number {
        this.mode = 'US-DIST-IN';
        return Number(this.getFloatValue(0));
    }

    /**
     * Value indicating whether another ultrasonic sensor could
     * be heard nearby.
     */
    get otherSensorPresent(): boolean {
        this.mode = 'US-LISTEN';
        return Boolean(this.getFloatValue(0));
    }

}

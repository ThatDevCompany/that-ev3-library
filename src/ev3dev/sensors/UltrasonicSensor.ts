import {Sensor} from './Sensor';

/**
 * LEGO EV3 ultrasonic sensor.
 */
export class UltrasonicSensor extends Sensor {
    /**
     * Constructor
     */
    constructor(port?: string) {
        super(port, ['lego-ev3-us', 'lego-nxt-us']);
    }

    /**
     * Measurement of the distance detected by the sensor in millimeters.
     */
    get distance(): number {
        this.mode = 'US-DIST-CM';
        return this.getValue(0) * 10;
    }

    /**
     * Value indicating whether another ultrasonic sensor could
     * be heard nearby.
     */
    get isOtherNearby(): boolean {
        this.mode = 'US-LISTEN';
        return !!this.getValue(0);
    }

}

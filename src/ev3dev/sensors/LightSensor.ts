import {Sensor} from './Sensor';

/**
 * LEGO NXT Light Sensor
 */
export class LightSensor extends Sensor {
    constructor(port?: string) {
        super(port, ['lego-nxt-light']);
    }

    /**
     * A measurement of the reflected light intensity, as a percentage.
     */
    get reflectedLightIntensity(): number {
        this.mode = 'REFLECT';
        return Number(this.getFloatValue(0));
    }

    /**
     * A measurement of the ambient light intensity, as a percentage.
     */
    get ambientLightIntensity(): number {
        this.mode = 'AMBIENT';
        return Number(this.getFloatValue(0));
    }

}

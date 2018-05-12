import {Sensor} from './Sensor';

/**
 * LEGO EV3 color sensor.
 */
export class ColorSensor extends Sensor {
    constructor(port?: string) {
        super(port, ['lego-ev3-color']);
    }

    /**
     * Reflected light intensity as a percentage. Light on sensor is red.
     */
    get reflectedLightIntensity(): number {
        this.mode = 'COL-REFLECT';
        return Number(this.getFloatValue(0));
    }

    /**
     * Ambient light intensity. Light on sensor is dimly lit blue.
     */
    get ambientLightIntensity(): number {
        this.mode = 'COL-AMBIENT';
        return Number(this.getFloatValue(0));
    }

    /**
     * Color detected by the sensor, categorized by overall value.
     *   - 0: No color
     *   - 1: Black
     *   - 2: Blue
     *   - 3: Green
     *   - 4: Yellow
     *   - 5: Red
     *   - 6: White
     *   - 7: Brown
     */
    get color(): number {
        this.mode = 'COL-COLOR';
        return Number(this.getFloatValue(0));
    }

    /**
     * Red component of the detected color, in the range 0-1020.
     */
    get red(): number {
        this.mode = 'RGB-RAW';
        return Number(this.getFloatValue(0));
    }

    /**
     * Green component of the detected color, in the range 0-1020.
     */
    get green(): number {
        this.mode = 'RGB-RAW';
        return Number(this.getFloatValue(1));
    }

    /**
     * Blue component of the detected color, in the range 0-1020.
     */
    get blue(): number {
        this.mode = 'RGB-RAW';
        return Number(this.getFloatValue(2));
    }

}

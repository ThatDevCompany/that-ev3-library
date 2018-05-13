import {Sensor} from './Sensor';

/**
 * Touch Sensor
 */
export class TouchSensor extends Sensor {
    /**
     * Constructor
     */
    constructor(port?: string) {
        super(port, ['lego-ev3-touch', 'lego-nxt-touch']);
    }

    /**
     * A boolean indicating whether the current touch sensor is being pressed.
     */
    get isPressed(): boolean {
        this.mode = 'TOUCH';
        return !!this.getValue(0);
    }
}

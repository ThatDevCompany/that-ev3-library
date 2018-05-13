import {Device} from '../io';

/**
 * Any device controlled by the generic LED driver.
 * See https://www.kernel.org/doc/Documentation/leds/leds-class.txt
 * for more details.
 */
export class LED extends Device {
    /**
     * Constructor
     */
    constructor(public deviceName: string) {
        super();
        this.connect('leds', deviceName);
    }

    /**
     * Sets the brightness level. Possible values are from 0 to 1.
     */
    get brightness(): number {
        return this.readPropertyAsNumber('brightness') / this.maxBrightness;
    }
    set brightness(value: number) {
        this.setPropertyFromNumber('brightness', Math.round(this.maxBrightness * value));
    }

    /**
     * Returns a list of available triggers.
     */
    protected get triggers(): string[] {
        return this.readPropertyAsArray('trigger');
    }

    /**
     * Sets the led trigger. A trigger
     * is a kernel based source of led events. Triggers can either be simple or
     * complex. A simple trigger isn't configurable and is designed to slot into
     * existing subsystems with minimal additional code. Examples are the `ide-disk` and
     * `nand-disk` triggers.
     *
     * Complex triggers whilst available to all LEDs have LED specific
     * parameters and work on a per LED basis. The `timer` trigger is an example.
     * The `timer` trigger will periodically change the LED brightness between
     * 0 and the current brightness setting. The `on` and `off` time can
     * be specified via `delay_{on,off}` attributes in milliseconds.
     * You can change the brightness value of a LED independently of the timer
     * trigger. However, if you set the brightness value to 0 it will
     * also disable the `timer` trigger.
     */
    protected get trigger(): string {
        return this.readPropertyAsSelector('trigger');
    }
    protected set trigger(value: string) {
        this.setProperty('trigger', value);
    }

    /**
     * The `timer` trigger will periodically change the LED brightness between
     * 0 and the current brightness setting. The `on` time can
     * be specified via `delay_on` attribute in milliseconds.
     */
    protected  get delayOn(): number {
        return this.readPropertyAsNumber('delay_on');
    }
    protected set delayOn(value: number) {
        this.setPropertyFromNumber('delay_on', value);
    }

    /**
     * The `timer` trigger will periodically change the LED brightness between
     * 0 and the current brightness setting. The `off` time can
     * be specified via `delay_off` attribute in milliseconds.
     */
    protected get delayOff(): number {
        return this.readPropertyAsNumber('delay_off');
    }
    protected set delayOff(value: number) {
        this.setPropertyFromNumber('delay_off', value);
    }

    /**
     * Returns the maximum allowable brightness value.
     */
    protected get maxBrightness(): number {
        return this.readPropertyAsNumber('max_brightness');
    }

    /**
     * Turns the LED on (to its maximum brightness by default)
     */
    on(brightness: number = 1) {
        this.brightness = brightness;
    }

    /**
     * Turns the LED off
     */
    off() {
        this.brightness = 0;
    }

    /**
     * Flashes the LED on a timer using the given intervals.
     */
    flash(onInterval: number, offInterval: number) {
        this.delayOn = onInterval;
        this.delayOff = offInterval;
        this.trigger = 'timer';
    }
}

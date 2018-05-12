import {Device} from '../io';

/**
 * Any device controlled by the generic LED driver.
 * See https://www.kernel.org/doc/Documentation/leds/leds-class.txt
 * for more details.
 */
export class LED extends Device {
    public deviceName: string;

    constructor(deviceName: string) {
        super();

        this.deviceName = deviceName;

        this.connect('leds', deviceName);
    }

    /**
     * Returns the maximum allowable brightness value.
     */
    get maxBrightness(): number {
        return this.readNumber('max_brightness');
    }

    /**
     * Sets the brightness level. Possible values are from 0 to `max_brightness`.
     */
    get brightness(): number {
        return this.readNumber('brightness');
    }

    /**
     * Sets the brightness level. Possible values are from 0 to `max_brightness`.
     */
    set brightness(value: number) {
        this.setNumber('brightness', value);
    }

    /**
     * Returns a list of available triggers.
     */
    get triggers(): string[] {
        return this.readStringArray('trigger');
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
    get trigger(): string {
        return this.readStringSelector('trigger');
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
    set trigger(value: string) {
        this.setString('trigger', value);
    }

    /**
     * The `timer` trigger will periodically change the LED brightness between
     * 0 and the current brightness setting. The `on` time can
     * be specified via `delay_on` attribute in milliseconds.
     */
    get delayOn(): number {
        return this.readNumber('delay_on');
    }

    /**
     * The `timer` trigger will periodically change the LED brightness between
     * 0 and the current brightness setting. The `on` time can
     * be specified via `delay_on` attribute in milliseconds.
     */
    set delayOn(value: number) {
        this.setNumber('delay_on', value);
    }

    /**
     * The `timer` trigger will periodically change the LED brightness between
     * 0 and the current brightness setting. The `off` time can
     * be specified via `delay_off` attribute in milliseconds.
     */
    get delayOff(): number {
        return this.readNumber('delay_off');
    }

    /**
     * The `timer` trigger will periodically change the LED brightness between
     * 0 and the current brightness setting. The `off` time can
     * be specified via `delay_off` attribute in milliseconds.
     */
    set delayOff(value: number) {
        this.setNumber('delay_off', value);
    }

    /**
     * Sets the LED's brightness to the given percent (0-1) of the max value.
     */
    public get brightnessPct(): number {
        return this.brightness / this.maxBrightness;
    }

    public set brightnessPct(brightnessPct: number) {
        this.brightness = Math.round(this.maxBrightness * brightnessPct);
    }

    /**
     * Sets brightness to maximum value, turning the LED on
     */
    public on() {
        this.brightness = this.maxBrightness;
    }

    /**
     * Sets brightness to 0, turning the LED off
     */
    public off() {
        this.brightness = 0;
    }

    /**
     * Flashes the LED on a timer using the given intervals.
     */
    public flash(onInterval: number, offInterval: number) {
        this.delayOn = onInterval;
        this.delayOff = offInterval;
        this.trigger = 'timer';
    }
}

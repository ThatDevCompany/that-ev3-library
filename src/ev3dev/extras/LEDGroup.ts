import {LED} from './LED';

/**
 * A coordinated group of LEDs
 */
export class LEDGroup {
    /**
     * PRIVATE
     * The LEDs in the Group
     */
    private _leds: Array<LED>;

    /**
     * Constructor
     */
    constructor(leds: Array<string | LED>) {
        this._leds = leds.map(led => (led instanceof LED) ? led : new LED(led));
    }

    /**
     * Are the LEDs in the LED Group all connected
     */
    get isConnected(): boolean {
        return this._leds.every(led => led.connected);
    }

    /**
     * Sets the brightness percentages for each LED in the group to the given percentages,
     * scaling each according to the given percent power scale if provided.
     *
     * @param colorCombination The percent powers to use for each LED, applied to the corresponding index in the LED group.
     * @param pctPower The scale factor to multiply each value by. Leave undefined or null to default to `1`.
     */
    setColor(colorCombination: number[], pctPower: number) {
        if (colorCombination.length !== this._leds.length) {
            throw new Error('The given color values had either too few or too many numbers for this LED group.'
                + ' Expected length: ' + this._leds.length + '; Given length: ' + colorCombination.length);
        }

        this._leds.forEach((led, idx) => {
            led.brightness = pctPower * colorCombination[idx];
        });
    }

    /**
     * Sets the given property names to the corresponding values on each LED in the group.
     *
     * If the requested property does not exist on the LED object, the property is skipped.
     *
     * @param props A hash containing the key-value pairs of properties to set.
     */
    setProps(props: { [propName: string]: any }) {
        this._leds.forEach(led => {
            for (let prop in Object.keys(props)) {
                if (led.hasOwnProperty(prop)) {
                    led[prop] = props[prop];
                }
            }
        });
    }

    /**
     * Turn on all LEDs in the group
     */
    allOn(brightness: number = 1) {
        this._leds.forEach(led => led.on(brightness));
    }

    /**
     * Turn off all LEDs in the group
     */
    allOff() {
        this._leds.forEach(led => led.off());
    }
}

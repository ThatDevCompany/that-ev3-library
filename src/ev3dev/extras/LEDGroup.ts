import {LED} from './LED';

export class LEDGroup {
    private leds: LED[];

    public constructor(...leds: (string | LED)[]) {
        this.leds = [];
        for (let ledObj of leds) {
            if (typeof ledObj === 'string') {
                let newLed = new LED(<string>ledObj);
                this.leds.push(newLed);
            } else {
                this.leds.push(<LED>ledObj);
            }
        }
    }

    public get isConnected(): boolean {
        return this.leds.every(function (led: LED, index: number, wholeArray: LED[]) {
            return led.connected;
        });
    }

    /**
     * Sets the brightness percentages for each LED in the group to the given percentages,
     * scaling each according to the given percent power scale if provided.
     *
     * @param colorCombination The percent powers to use for each LED, applied to the corresponding index in the LED group.
     * @param pctPower The scale factor to multiply each value by. Leave undefined or null to default to `1`.
     */
    public setColor(colorCombination: number[], pctPower: number) {
        if (colorCombination.length !== this.leds.length) {
            throw new Error('The given color values had either too few or too many numbers for this LED group.'
                + ' Expected length: ' + this.leds.length + '; Given length: ' + colorCombination.length);
        }

        if (pctPower === undefined || pctPower == null) {
            pctPower = 1;
        }

        for (let ledIndex = 0; ledIndex < this.leds.length; ledIndex++) {
            this.leds[ledIndex].brightnessPct = pctPower * colorCombination[ledIndex];
        }
    }

    /**
     * Sets the given property names to the corresponding values on each LED in the group.
     *
     * If the requested property does not exist on the LED object, the property is skipped.
     *
     * @param props A hash containing the key-value pairs of properties to set.
     */
    public setProps(props: { [propName: string]: any }) {
        for (let led of this.leds) {
            for (let prop in Object.keys(props)) {
                if (Object.keys(led).indexOf(prop) !== -1) {
                    led[prop] = props[prop];
                }
            }
        }
    }

    public allOn() {
        for (let led of this.leds) {
            led.on();
        }
    }

    public allOff() {
        for (let led of this.leds) {
            led.off();
        }
    }
}

import { Sensor } from './Sensor'

/**
 * A simple RGB color type (TODO: replace with threeJS color type)
 * */
export type RGBColor = {
	r: number // 0 to 1
	g: number // 0 to 1
	b: number // 0 to 1
}

/**
 * The basic set of color intepretations given directly by the LEGO EV3 color sensor
 */
export enum EV3Color {
	NONE,
	BLACK,
	BLUE,
	GREEN,
	YELLOW,
	RED,
	WHITE,
	BROWN
}

/**
 * LEGO EV3 color sensor.
 */
export class ColorSensor extends Sensor {
	constructor(port?: string) {
		super(port, ['lego-ev3-color'])
	}

	/**
	 * Reflected light intensity as a percentage. Light on sensor is red.
	 */
	get reflectedLightIntensity(): number {
		this.mode = 'COL-REFLECT'
		return this.getValue(0)
	}

	/**
	 * Ambient light intensity. Light on sensor is dimly lit blue.
	 */
	get ambientLightIntensity(): number {
		this.mode = 'COL-AMBIENT'
		return this.getValue(0)
	}

	/**
	 * The EV3 Color detected by the sensor, categorized by overall value.
	 *   - 0: No color
	 *   - 1: Black
	 *   - 2: Blue
	 *   - 3: Green
	 *   - 4: Yellow
	 *   - 5: Red
	 *   - 6: White
	 *   - 7: Brown
	 */
	get color(): EV3Color {
		this.mode = 'COL-COLOR'
		return <EV3Color>this.getValue(0)
	}

	/**
	 * The RGB of the color detected by the sensor
	 */
	get rgbColor(): RGBColor {
		this.mode = 'RGB-RAW'
		return {
			r: this.getValue(0) / 1020,
			g: this.getValue(1) / 1020,
			b: this.getValue(2) / 1020
		}
	}
}

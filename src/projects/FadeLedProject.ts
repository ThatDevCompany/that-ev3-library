import {IProject} from './IProject';
import {Ev3Leds} from '../ev3dev';

/**
 * A clone of the ev3dev fade led project
 */
export const FadeLedProject: IProject = {

	/**
	 * The name of the Project
	 */
	name: 'Fade LED Project',

	run() {
		console.log('fading LEDs from green to red...');

		for (let pct = 0; pct < 100; pct += 1) {
			let brightnessVal = (pct / 100);
			let invertedBrightnessVal = 1 - brightnessVal;

			Ev3Leds.left.setColor([ brightnessVal, invertedBrightnessVal ], 0);
			Ev3Leds.right.setColor([ brightnessVal, invertedBrightnessVal ], 0);

			if (pct % 10 === 0) {
				console.log(pct + '%');
			}

			{   // Hack to sleep for time
				//    SHOULD NOT BE USED IN PRODUCTION CODE
				let start = new Date().getTime();
				while (new Date().getTime() < start + 100) {}
			}
		}

		console.log('done');

		Ev3Leds.left.allOff();
		Ev3Leds.right.allOff();
	}
};

import * as brickpi3 from 'brickpi3';

export class HelloPi {

	constructor() {
		console.log('Hello Pi');
	}

	async run() {
		try {
			let BP = new brickpi3.BrickPi3();

			//Make sure to stop and free all motors and sensors when the programm exits
			brickpi3.utils.resetAllWhenFinished(BP);

			//Resetting offset position of motor A to 0
			let encoder = await BP.get_motor_encoder(BP.PORT_A);
			await BP.offset_motor_encoder(BP.PORT_A, encoder);
			await BP.set_motor_power(BP.PORT_A, 10);

		} catch (err) {
			console.error(err);
		}
	}

}

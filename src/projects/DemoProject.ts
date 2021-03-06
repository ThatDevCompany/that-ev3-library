import { IProject } from './IProject'
import { TachoMotor, Sensor, TachoStopAction, TachoCommand } from '../ev3dev'

/**
 * An example project which demonstrates the majority of the available
 * functionality within the EV3 library
 */
export const DemoProject: IProject = {
	/**
	 * The name of the Project
	 */
	name: 'Demo Project',

	run() {
		// Run motor
		console.log('Motor --------------')

		// Pick the first connected motor
		let motor = new TachoMotor()

		if (!motor.connected) {
			console.log(
				'No motor could be found. Are you sure that one is connected?'
			)
			return
		}

		console.log(' Port: ' + motor.address)
		console.log(' Driver: ' + motor.driverName)

		console.log('Sending motor command...')

		// motor.rampUpSp = 100;
		// motor.rampDownSp = 100;
		motor.runForTime(1000, motor.maxSpeed / 2, TachoStopAction.BRAKE)

		do {
			console.log('Motor speed: ' + motor.speed)

			{
				// Hack to sleep for time SHOULD NOT BE USED IN PRODUCTION CODE
				let start = new Date().getTime()
				while (new Date().getTime() < start + 80) {}
			}
		} while (motor.speed > 10)

		console.log('--------------------')

		// Read sensor
		console.log('Sensor -------------')
		// Pick the first connected sensor
		let sensor = new Sensor()

		if (!sensor.connected) {
			console.log(
				'No sensor could be found. Are you sure that one is connected?'
			)
			return
		}

		console.log(' Port: ' + sensor.address)
		console.log(' Driver: ' + sensor.driverName)

		console.log('--------------------')
		console.log('Core motor and sensor test complete')
	}
}

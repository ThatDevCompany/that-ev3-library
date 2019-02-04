import { IProject } from './IProject'
import { PowerSupply } from '../ev3dev'

/**
 * A clone of the ev3dev battery metadata project
 */
export const BatteryProject: IProject = {
	/**
	 * The name of the Project
	 */
	name: 'Battery Project',

	run() {
		let battery = new PowerSupply('test')
		console.log('Default Battery --------------')

		if (battery.connected) {
			console.log('  Technology: ' + battery.technology)
			console.log('  Type: ' + battery.type)

			console.log('  Current (amps): ' + battery.current)

			console.log('  Voltage (volts): ' + battery.voltage)

			console.log('  Max voltage (volts): ' + battery.maxVoltage)
			console.log('  Min voltage (volts): ' + battery.minVoltage)
		} else {
			console.log('  Battery not connected!')
		}
	}
}

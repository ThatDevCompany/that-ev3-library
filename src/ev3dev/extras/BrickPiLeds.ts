import { LED } from './LED'
import { LEDGroup } from './LEDGroup'

export const BrickPiLeds = (() => {
	let blueLed1 = new LED('brickpi:led1:blue:ev3dev')
	let blueLed2 = new LED('brickpi:led2:blue:ev3dev')

	return {
		led1: new LEDGroup(blueLed1),
		led2: new LEDGroup(blueLed2),
		colors: {
			black: [0],
			blue: [1]
		},
		get isConnected(): boolean {
			return blueLed1.connected && blueLed2.connected
		}
	}
})()

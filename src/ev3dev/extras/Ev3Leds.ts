import {LED} from './LED';
import {LEDGroup} from './LEDGroup';

export const Ev3Leds = (() => {

    let redLeft = new LED('ev3:left:red:ev3dev');
    let redRight = new LED('ev3:right:red:ev3dev');
    let greenLeft = new LED('ev3:left:green:ev3dev');
    let greenRight = new LED('ev3:right:green:ev3dev');

    return {
        left: new LEDGroup(redLeft, greenLeft),
        right: new LEDGroup(redRight, greenRight),
        color: {
            blackColor: [0, 0],
            redColor: [1, 0],
            greenColor: [0, 1],
            amberColor: [1, 1],
            orangeColor: [1, 0.5],
            yellowColor: [0.1, 1]
        },
        get isConnected(): boolean {
            return redLeft.connected && redRight.connected && greenLeft.connected && greenRight.connected;
        }
    }
})();

import {LED} from './LED';
import {LEDGroup} from './LEDGroup';

export class BrickPiLeds {

    public static blueLed1 = new LED('brickpi:led1:blue:ev3dev');
    public static blueLed2 = new LED('brickpi:led2:blue:ev3dev');

    public static led1 = new LEDGroup(BrickPiLeds.blueLed1);
    public static led2 = new LEDGroup(BrickPiLeds.blueLed2);

    public static blackColor = [0];
    public static blueColor = [1];

    public static get isConnected(): boolean {
        return BrickPiLeds.blueLed1.connected && BrickPiLeds.blueLed2.connected;
    }
}

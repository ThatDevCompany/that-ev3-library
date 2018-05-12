import {LED} from './LED';
import {LEDGroup} from './LEDGroup';

export class Ev3Leds {

    public static redLeft = new LED('ev3:left:red:ev3dev');
    public static redRight = new LED('ev3:right:red:ev3dev');
    public static greenLeft = new LED('ev3:left:green:ev3dev');
    public static greenRight = new LED('ev3:right:green:ev3dev');

    public static left = new LEDGroup(Ev3Leds.redLeft, Ev3Leds.greenLeft);
    public static right = new LEDGroup(Ev3Leds.redRight, Ev3Leds.greenRight);

    public static blackColor = [0, 0];
    public static redColor = [1, 0];
    public static greenColor = [0, 1];
    public static amberColor = [1, 1];
    public static orangeColor = [1, 0.5];
    public static yellowColor = [0.1, 1];

    public static get isConnected(): boolean {
        return Ev3Leds.redLeft.connected && Ev3Leds.redRight.connected && Ev3Leds.greenLeft.connected && Ev3Leds.greenRight.connected;
    }
}
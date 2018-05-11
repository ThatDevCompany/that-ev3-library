/*
 * This is a language binding for the ev3dev device APIs. More info at: https://github.com/ev3dev/ev3dev-lang
 * This library complies with spec v0.9.3.
 */

import io = require('./io');
import motors = require('./motors');
import sensors = require('./sensors');
import extras = require('./extras');

// Constants
export const INPUT_AUTO = undefined;
export const OUTPUT_AUTO = undefined;

export const INPUT_1 = 'in1';
export const INPUT_2 = 'in2';
export const INPUT_3 = 'in3';
export const INPUT_4 = 'in4';

export const OUTPUT_A = 'outA';
export const OUTPUT_B = 'outB';
export const OUTPUT_C = 'outC';
export const OUTPUT_D = 'outD';

// IO
export const Device = io.Device;
export const IndexedDevice = io.IndexedDevice;

// Motors
export const Motor = motors.Motor;
export const DcMotor = motors.DcMotor;
export const LargeMotor = motors.LargeMotor;
export const MediumMotor = motors.MediumMotor;
export const ServoMotor = motors.ServoMotor;

export module Motor {

	export type CommandValue = motors.Motor.CommandValue;
	export type EncoderPolarityValue = motors.Motor.EncoderPolarityValue;
	export type PolarityValue = motors.Motor.PolarityValue;
	export type StateValue = motors.Motor.StateValue;
	export type StopActionValue = motors.Motor.StopActionValue;
}

export module ServoMotor {

	export type CommandValue = motors.ServoMotor.CommandValue;
	export type PolarityValue = motors.ServoMotor.PolarityValue;
}

export module DcMotor {

	export type CommandValue = motors.DcMotor.CommandValue;
	export type PolarityValue = motors.DcMotor.PolarityValue;
	export type StopActionValue = motors.DcMotor.StopActionValue;
}

// Sensors
export const Sensor = sensors.Sensor;
export const I2CSensor = sensors.I2CSensor;
export const TouchSensor = sensors.TouchSensor;
export const ColorSensor = sensors.ColorSensor;
export const UltrasonicSensor = sensors.UltrasonicSensor;
export const GyroSensor = sensors.GyroSensor;
export const InfraredSensor = sensors.InfraredSensor;
export const SoundSensor = sensors.SoundSensor;
export const LightSensor = sensors.LightSensor;

// Extras
export const PowerSupply = extras.PowerSupply;
export const LED = extras.LED;
export const LEDGroup = extras.LEDGroup;
export const LegoPort = extras.LegoPort;

export class Ev3Leds {

	public static redLeft = new extras.LED('ev3:left:red:ev3dev');
	public static redRight = new extras.LED('ev3:right:red:ev3dev');
	public static greenLeft = new extras.LED('ev3:left:green:ev3dev');
	public static greenRight = new extras.LED('ev3:right:green:ev3dev');

	public static left = new extras.LEDGroup(Ev3Leds.redLeft, Ev3Leds.greenLeft);
	public static right = new extras.LEDGroup(Ev3Leds.redRight, Ev3Leds.greenRight);

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

export class BrickpiLeds {

	public static blueLed1 = new extras.LED('brickpi:led1:blue:ev3dev');
	public static blueLed2 = new extras.LED('brickpi:led2:blue:ev3dev');

	public static led1 = new extras.LEDGroup(BrickpiLeds.blueLed1);
	public static led2 = new extras.LEDGroup(BrickpiLeds.blueLed2);

	public static blackColor = [0];
	public static blueColor = [1];

	public static get isConnected(): boolean {
		return BrickpiLeds.blueLed1.connected && BrickpiLeds.blueLed2.connected;
	}
}

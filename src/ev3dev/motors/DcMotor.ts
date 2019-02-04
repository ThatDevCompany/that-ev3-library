import { IndexedDevice } from '../io'
import { Polarity } from '../extras'

export enum DcCommand {
	RUN_FOREVER = 'run-forever',
	RUN_TIMED = 'run-timed',
	RUN_DIRECT = 'run-direct',
	STOP = 'stop'
}

export enum DcState {
	RUNNING = 'running',
	RAMPING = 'ramping'
}

export enum DcStopAction {
	COAST = 'coast',
	BRAKE = 'brake'
}

/**
 * The DC motor class provides a uniform interface for using regular DC motors
 * with no fancy controls or feedback. This includes LEGO MINDSTORMS RCX motors
 * and LEGO Power Functions motors.
 */
export class DcMotor extends IndexedDevice {
	/**
	 * Constructor
	 */
	constructor(port: string) {
		super('dc-motor', null, port)
	}

	/**
	 * Returns a boolean indicating whether the Tacho is in a running state
	 */
	get isRunning(): boolean {
		return this.hasState(DcState.RUNNING)
	}

	/**
	 * Returns a boolean indicating whether the Tacho is in a ramping state
	 */
	get isRamping(): boolean {
		return this.hasState(DcState.RAMPING)
	}

	/**
	 * Shows the current duty cycle of the PWM signal sent to the motor. Values
	 * are -100 to 100 (-100% to 100%).
	 */
	get dutyCycle(): number {
		return this.readPropertyAsNumber('duty_cycle')
	}

	/**
	 * Writing sets the duty cycle setpoint of the PWM signal sent to the motor.
	 * Valid values are -100 to 100 (-100% to 100%). Reading returns the current
	 * setpoint.
	 */
	get dutyCycleSp(): number {
		return this.readPropertyAsNumber('duty_cycle_sp')
	}

	set dutyCycleSp(value: number) {
		this.setPropertyFromNumber('duty_cycle_sp', value)
	}

	/**
	 * Sets the polarity of the motor. Valid values are `normal` and `inversed`.
	 */
	get polarity(): Polarity {
		return <Polarity>this.readProperty('polarity')
	}

	set polarity(value: Polarity) {
		this.setProperty('polarity', value)
	}

	/**
	 * Writing specifies the amount of time the motor will run when using the
	 * `run-timed` command. Reading returns the current value. Units are in
	 * milliseconds.
	 */
	get timeSp(): number {
		return this.readPropertyAsNumber('time_sp')
	}

	set timeSp(value: number) {
		this.setPropertyFromNumber('time_sp', value)
	}

	/**
	 * Returns the name of the port that this motor is connected to.
	 */
	get address(): string {
		return this.readProperty('address')
	}

	/**
	 * Returns the name of the motor driver that loaded this device. See the list
	 * of [supported devices] for a list of drivers.
	 */
	get driverName(): string {
		return this.readProperty('driver_name')
	}

	/**
	 * Sets the command for the motor. Possible values are `run-forever`, `run-timed` and
	 * `stop`. Not all commands may be supported, so be sure to check the contents
	 * of the `commands` attribute.
	 */
	protected set command(value: DcCommand) {
		this.setProperty('command', value)
	}

	/**
	 * Returns a list of commands supported by the motor
	 * controller.
	 */
	protected get commands(): string[] {
		return this.readPropertyAsArray('commands')
	}

	/**
	 * Sets the time in milliseconds that it take the motor to ramp down from 100%
	 * to 0%. Valid values are 0 to 10000 (10 seconds). Default is 0.
	 */
	protected get rampDownSp(): number {
		return this.readPropertyAsNumber('ramp_down_sp')
	}

	protected set rampDownSp(value: number) {
		this.setPropertyFromNumber('ramp_down_sp', value)
	}

	/**
	 * Sets the time in milliseconds that it take the motor to up ramp from 0% to
	 * 100%. Valid values are 0 to 10000 (10 seconds). Default is 0.
	 */
	protected get rampUpSp(): number {
		return this.readPropertyAsNumber('ramp_up_sp')
	}

	protected set rampUpSp(value: number) {
		this.setPropertyFromNumber('ramp_up_sp', value)
	}

	/**
	 * Gets a list of flags indicating the motor status. Possible
	 * flags are `running` and `ramping`. `running` indicates that the motor is
	 * powered. `ramping` indicates that the motor has not yet reached the
	 * `duty_cycle_sp`.
	 */
	protected get state(): string[] {
		return this.readPropertyAsArray('state')
	}

	/**
	 * Sets the stop action that will be used when the motor stops. Read
	 * `stop_actions` to get the list of valid values.
	 */
	protected set stopAction(value: DcStopAction) {
		this.setProperty('stop_action', value)
	}

	/**
	 * Gets a list of stop actions. Valid values are `coast`
	 * and `brake`.
	 */
	protected get stopActions(): string[] {
		return this.readPropertyAsArray('stop_actions')
	}

	runForever(stopAction?: DcStopAction) {
		if (stopAction !== undefined) {
			this.stopAction = stopAction
		}

		this.command = DcCommand.RUN_FOREVER
	}

	runForTime(timeMs: number, stopAction?: DcStopAction) {
		if (timeMs !== undefined) {
			this.timeSp = timeMs
		}

		if (stopAction !== undefined) {
			this.stopAction = stopAction
		}

		this.command = DcCommand.RUN_TIMED
	}

	stop() {
		this.command = DcCommand.STOP
	}

	private hasState(state: DcState): boolean {
		return this.state.indexOf(state) >= 0
	}
}

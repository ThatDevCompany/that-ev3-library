import {IndexedDevice} from '../io';
import {Polarity} from '../extras';

export enum TachoCommand {
    RUN_FOREVER = 'run-forever',
    RUN_TO_ABS_POS = 'run-to-abs-pos',
    RUN_TO_REL_POS = 'run-to-rel-pos',
    RUN_TIMED = 'run-timed',
    RUN_DIRECT = 'run-direct',
    STOP = 'stop',
    RESET = 'reset'
}

export enum TachoState {
    RUNNING = 'running',
    RAMPING = 'ramping',
    HOLDING = 'holding',
    OVERLOADED = 'overloaded',
    STALLED = 'stalled'
}

export enum TachoStopAction {
    COAST = 'coast',
    BRAKE = 'brake',
    HOLD = 'hold'
}

/**
 * The motor class provides a uniform interface for using motors with
 * positional and directional feedback such as the EV3 and NXT motors.
 * This feedback allows for precise control of the motors. This is the
 * most common type of motor, so we just call it `motor`.
 *
 * The way to configure a motor is to set the '_sp' attributes when
 * calling a command or before. Only in 'run_direct' mode attribute
 * changes are processed immediately, in the other modes they only
 * take place when a new command is issued.
 */
export class TachoMotor extends IndexedDevice {

    constructor(port?: string, targetDriverName?: 'lego-ev3-l-motor' | 'lego-ev3-m-motor') {
        super('tacho-motor', null, port, targetDriverName);
    }

    /**
     * Returns a boolean indicating whether the Tacho is in a running state
     */
    get isRunning(): boolean {
        return this.hasState(TachoState.RUNNING);
    }

    /**
     * Returns a boolean indicating whether the Tacho is in a ramping state
     */
    get isRamping(): boolean {
        return this.hasState(TachoState.RAMPING);
    }

    /**
     * Returns a boolean indicating whether the Tacho is in a holding state
     */
    get isHolding(): boolean {
        return this.hasState(TachoState.HOLDING);
    }

    /**
     * Returns a boolean indicating whether the Tacho is in a overloaded state
     */
    get isOverloaded(): boolean {
        return this.hasState(TachoState.OVERLOADED);
    }

    /**
     * Returns a boolean indicating whether the Tacho is in a stalled state
     */
    get isStalled(): boolean {
        return this.hasState(TachoState.STALLED);
    }

    /**
     * Returns the number of tacho counts in one rotation of the  Tacho counts
     * are used by the position and speed attributes, so you can use this value
     * to convert rotations or degrees to tacho counts. (rotation motors only)
     */
    get countPerRot(): number {
        return this.readPropertyAsNumber('count_per_rot');
    }

    /**
     * Returns the number of tacho counts in one meter of travel of the  Tacho
     * counts are used by the position and speed attributes, so you can use this
     * value to convert from distance to tacho counts. (linear motors only)
     */
    get countPerM(): number {
        return this.readPropertyAsNumber('count_per_m');
    }

    /**
     * Returns the number of tacho counts in the full travel of the  When
     * combined with the `count_per_m` atribute, you can use this value to
     * calculate the maximum travel distance of the  (linear motors only)
     */
    get fullTravelCount(): number {
        return this.readPropertyAsNumber('full_travel_count');
    }

    /**
     * Returns the current duty cycle of the  Units are percent. Values
     * are -100 to 100.
     */
    get dutyCycle(): number {
        return this.readPropertyAsNumber('duty_cycle');
    }

    /**
     * Writing sets the duty cycle setpoint. Reading returns the current value.
     * Units are in percent. Valid values are -100 to 100. A negative value causes
     * the motor to rotate in reverse.
     */
    get dutyCycleSp(): number {
        return this.readPropertyAsNumber('duty_cycle_sp');
    }

    set dutyCycleSp(value: number) {
        this.setPropertyFromNumber('duty_cycle_sp', value);
    }

    /**
     * Returns the name of the port that this motor is connected to.
     */
    get address(): string {
        return this.readProperty('address');
    }

    /**
     * Returns the name of the driver that provides this tacho motor device.
     */
    get driverName(): string {
        return this.readProperty('driver_name');
    }

    /**
     * Sets the polarity of the  With `normal` polarity, a positive duty
     * cycle will cause the motor to rotate clockwise. With `inversed` polarity,
     * a positive duty cycle will cause the motor to rotate counter-clockwise.
     * Valid values are `normal` and `inversed`.
     */
    get polarity(): Polarity {
        return <Polarity> this.readProperty('polarity');
    }

    set polarity(value: Polarity) {
        this.setProperty('polarity', value);
    }

    /**
     * Returns the maximum value that is accepted by the `speed_sp` attribute. This
     * may be slightly different than the maximum speed that a particular motor can
     * reach - it's the maximum theoretical speed.
     */
    get maxSpeed(): number {
        return this.readPropertyAsNumber('max_speed');
    }

    /**
     * Returns the current motor speed in tacho counts per second. Note, this is
     * not necessarily degrees (although it is for LEGO motors). Use the `count_per_rot`
     * attribute to convert this value to RPM or deg/sec.
     */
    get speed(): number {
        return this.readPropertyAsNumber('speed');
    }

    /**
     * Writing sets the target speed in tacho counts per second used for all `run-*`
     * commands except `run-direct`. Reading returns the current value. A negative
     * value causes the motor to rotate in reverse with the exception of `run-to-*-pos`
     * commands where the sign is ignored. Use the `count_per_rot` attribute to convert
     * RPM or deg/sec to tacho counts per second. Use the `count_per_m` attribute to
     * convert m/s to tacho counts per second.
     */
    get speedSp(): number {
        return this.readPropertyAsNumber('speed_sp');
    }

    set speedSp(value: number) {
        this.setPropertyFromNumber('speed_sp', value);
    }

    /**
     * Reading returns the current stop action. Writing sets the stop action.
     * The value determines the motors behavior when `command` is set to `stop`.
     * Also, it determines the motors behavior when a run command completes. See
     * `stop_actions` for a list of possible values.
     */
    get stopAction(): TachoStopAction {
        return <TachoStopAction> this.readProperty('stop_action');
    }

    set stopAction(value: TachoStopAction) {
        this.setProperty('stop_action', value);
    }

    /**
     * Writing specifies the amount of time the motor will run when using the
     * `run-timed` command. Reading returns the current value. Units are in
     * milliseconds.
     */
    get timeSp(): number {
        return this.readPropertyAsNumber('time_sp');
    }

    set timeSp(value: number) {
        this.setPropertyFromNumber('time_sp', value);
    }

    /**
     * Returns the current position of the motor in pulses of the rotary
     * encoder. When the motor rotates clockwise, the position will increase.
     * Likewise, rotating counter-clockwise causes the position to decrease.
     * Writing will set the position to that value.
     */
    get position(): number {
        return this.readPropertyAsNumber('position');
    }

    set position(value: number) {
        this.setPropertyFromNumber('position', value);
    }

    /**
     * Writing specifies the target position for the `run-to-abs-pos` and `run-to-rel-pos`
     * commands. Reading returns the current value. Units are in tacho counts. You
     * can use the value returned by `counts_per_rot` to convert tacho counts to/from
     * rotations or degrees.
     */
    get positionSp(): number {
        return this.readPropertyAsNumber('position_sp');
    }

    set positionSp(value: number) {
        this.setPropertyFromNumber('position_sp', value);
    }

    /**
     * Sends a command to the motor controller. See `commands` for a list of
     * possible values.
     */
    protected set command(value: TachoCommand) {
        this.setProperty('command', value);
    }

    /**
     * Returns a list of commands that are supported by the motor
     * controller. Possible values are `run-forever`, `run-to-abs-pos`, `run-to-rel-pos`,
     * `run-timed`, `run-direct`, `stop` and `reset`. Not all commands may be supported.
     *
     * - `run-forever` will cause the motor to run until another command is sent.
     * - `run-to-abs-pos` will run to an absolute position specified by `position_sp`
     *   and then stop using the action specified in `stop_action`.
     * - `run-to-rel-pos` will run to a position relative to the current `position` value.
     *   The new position will be current `position` + `position_sp`. When the new
     *   position is reached, the motor will stop using the action specified by `stop_action`.
     * - `run-timed` will run the motor for the amount of time specified in `time_sp`
     *   and then stop the motor using the action specified by `stop_action`.
     * - `run-direct` will run the motor at the duty cycle specified by `duty_cycle_sp`.
     *   Unlike other run commands, changing `duty_cycle_sp` while running *will*
     *   take effect immediately.
     * - `stop` will stop any of the run commands before they are complete using the
     *   action specified by `stop_action`.
     * - `reset` will reset all of the motor parameter attributes to their default value.
     *   This will also have the effect of stopping the
     */
    protected get commands(): string[] {
        return this.readPropertyAsArray('commands');
    }

    /**
     * The proportional constant for the position PID.
     */
    protected get positionP(): number {
        return this.readPropertyAsNumber('hold_pid/Kp');
    }

    protected set positionP(value: number) {
        this.setPropertyFromNumber('hold_pid/Kp', value);
    }

    /**
     * The integral constant for the position PID.
     */
    protected get positionI(): number {
        return this.readPropertyAsNumber('hold_pid/Ki');
    }

    protected set positionI(value: number) {
        this.setPropertyFromNumber('hold_pid/Ki', value);
    }

    /**
     * The derivative constant for the position PID.
     */
    protected get positionD(): number {
        return this.readPropertyAsNumber('hold_pid/Kd');
    }

    protected set positionD(value: number) {
        this.setPropertyFromNumber('hold_pid/Kd', value);
    }

    /**
     * Writing sets the ramp up setpoint. Reading returns the current value. Units
     * are in milliseconds and must be positive. When set to a non-zero value, the
     * motor speed will increase from 0 to 100% of `max_speed` over the span of this
     * setpoint. The actual ramp time is the ratio of the difference between the
     * `speed_sp` and the current `speed` and max_speed multiplied by `ramp_up_sp`.
     */
    protected get rampUpSp(): number {
        return this.readPropertyAsNumber('ramp_up_sp');
    }

    protected set rampUpSp(value: number) {
        this.setPropertyFromNumber('ramp_up_sp', value);
    }

    /**
     * Writing sets the ramp down setpoint. Reading returns the current value. Units
     * are in milliseconds and must be positive. When set to a non-zero value, the
     * motor speed will decrease from 0 to 100% of `max_speed` over the span of this
     * setpoint. The actual ramp time is the ratio of the difference between the
     * `speed_sp` and the current `speed` and max_speed multiplied by `ramp_down_sp`.
     */
    protected get rampDownSp(): number {
        return this.readPropertyAsNumber('ramp_down_sp');
    }

    protected set rampDownSp(value: number) {
        this.setPropertyFromNumber('ramp_down_sp', value);
    }

    /**
     * The proportional constant for the speed regulation PID.
     */
    protected get speedP(): number {
        return this.readPropertyAsNumber('speed_pid/Kp');
    }

    protected set speedP(value: number) {
        this.setPropertyFromNumber('speed_pid/Kp', value);
    }

    /**
     * The integral constant for the speed regulation PID.
     */
    protected get speedI(): number {
        return this.readPropertyAsNumber('speed_pid/Ki');
    }

    protected set speedI(value: number) {
        this.setPropertyFromNumber('speed_pid/Ki', value);
    }

    /**
     * The derivative constant for the speed regulation PID.
     */
    protected get speedD(): number {
        return this.readPropertyAsNumber('speed_pid/Kd');
    }

    protected set speedD(value: number) {
        this.setPropertyFromNumber('speed_pid/Kd', value);
    }

    /**
     * Reading returns a list of state flags. Possible flags are
     * `running`, `ramping`, `holding`, `overloaded` and `stalled`.
     */
    protected get state(): Array<TachoState> {
        return <Array<TachoState>> this.readPropertyAsArray('state');
    }

    runForever(sp?: number, stopAction?: TachoStopAction) {
        if (sp !== undefined) {
            this.speedSp = sp;
        }

        if (stopAction !== undefined) {
            this.stopAction = stopAction;
        }

        this.command = TachoCommand.RUN_FOREVER;
    }

    runToPosition(position?: number, speedSp?: number, stopAction?: TachoStopAction) {
        this.runToAbsolutePosition(position, speedSp, stopAction);
    }

    runToAbsolutePosition(position?: number, speedSp?: number, stopAction?: TachoStopAction) {
        if (speedSp !== undefined) {
            this.speedSp = speedSp;
        }

        if (position !== undefined) {
            this.positionSp = position;
        }

        if (stopAction !== undefined) {
            this.stopAction = stopAction;
        }

        this.command = TachoCommand.RUN_TO_ABS_POS;
    }

    runForDistance(distance?: number, speedSp?: number, stopAction?: TachoStopAction) {
        this.runToRelativePosition(distance, speedSp, stopAction);
    }

    runToRelativePosition(relPos?: number, speedSp?: number, stopAction?: TachoStopAction) {
        if (speedSp !== undefined) {
            this.speedSp = speedSp;
        }

        if (relPos !== undefined) {
            this.positionSp = relPos;
        }

        if (stopAction !== undefined) {
            this.stopAction = stopAction;
        }

        this.command = TachoCommand.RUN_TO_REL_POS;
    }

    runForTime(timeMs: number, speedSp?: number, stopAction?: TachoStopAction) {
        if (speedSp !== undefined) {
            this.speedSp = speedSp;
        }

        if (timeMs !== undefined) {
            this.timeSp = timeMs;
        }

        if (stopAction !== undefined) {
            this.stopAction = stopAction;
        }

        this.command = TachoCommand.RUN_TIMED;
    }

    reset() {
        this.command = TachoCommand.RESET;
    }

    stop() {
        this.command = TachoCommand.STOP;
    }

    private hasState(state: TachoState): boolean {
        return this.state.indexOf(state) >= 0;
    }


}

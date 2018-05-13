import {IndexedDevice} from '../io';
import {Polarity} from '../extras';
import {TachoCommand, TachoStopAction} from './TachoMotor';

export enum ServoCommand {
    RUN = 'run',
    FLOAT = 'float'
}

export enum ServoState {
    RUNNING = 'running'
}

/**
 * The servo motor class provides a uniform interface for using hobby type
 * servo motors.
 */
export class ServoMotor extends IndexedDevice {

    constructor(port: string) {
        super('servo-motor', null, port);
    }

    get isRunning(): boolean {
        return this.state.indexOf(ServoState.RUNNING) >= 0;
    }

    /**
     * Returns the name of the motor driver that loaded this device. See the list
     * of [supported devices] for a list of drivers.
     */
    get driverName(): string {
        return this.readProperty('driver_name');
    }

    /**
     * Used to set the pulse size in milliseconds for the signal that tells the
     * servo to drive to the maximum (clockwise) position_sp. Default value is 2400.
     * Valid values are 2300 to 2700. You must write to the position_sp attribute for
     * changes to this attribute to take effect.
     */
    get maxPulseSp(): number {
        return this.readPropertyAsNumber('max_pulse_sp');
    }

    set maxPulseSp(value: number) {
        this.setPropertyFromNumber('max_pulse_sp', value);
    }

    /**
     * Used to set the pulse size in milliseconds for the signal that tells the
     * servo to drive to the mid position_sp. Default value is 1500. Valid
     * values are 1300 to 1700. For example, on a 180 degree servo, this would be
     * 90 degrees. On continuous rotation servo, this is the 'neutral' position_sp
     * where the motor does not turn. You must write to the position_sp attribute for
     * changes to this attribute to take effect.
     */
    get midPulseSp(): number {
        return this.readPropertyAsNumber('mid_pulse_sp');
    }

    set midPulseSp(value: number) {
        this.setPropertyFromNumber('mid_pulse_sp', value);
    }

    /**
     * Used to set the pulse size in milliseconds for the signal that tells the
     * servo to drive to the miniumum (counter-clockwise) position_sp. Default value
     * is 600. Valid values are 300 to 700. You must write to the position_sp
     * attribute for changes to this attribute to take effect.
     */
    get minPulseSp(): number {
        return this.readPropertyAsNumber('min_pulse_sp');
    }

    set minPulseSp(value: number) {
        this.setPropertyFromNumber('min_pulse_sp', value);
    }

    /**
     * Sets the polarity of the servo. Valid values are `normal` and `inversed`.
     * Setting the value to `inversed` will cause the position_sp value to be
     * inversed. i.e `-100` will correspond to `max_pulse_sp`, and `100` will
     * correspond to `min_pulse_sp`.
     */
    get polarity(): Polarity {
        return <Polarity> this.readProperty('polarity');
    }

    set polarity(value: Polarity) {
        this.setProperty('polarity', value);
    }

    /**
     * Reading returns the current position_sp of the servo. Writing instructs the
     * servo to move to the specified position_sp. Units are percent. Valid values
     * are -100 to 100 (-100% to 100%) where `-100` corresponds to `min_pulse_sp`,
     * `0` corresponds to `mid_pulse_sp` and `100` corresponds to `max_pulse_sp`.
     */
    get positionSp(): number {
        return this.readPropertyAsNumber('position_sp');
    }

    set positionSp(value: number) {
        this.setPropertyFromNumber('position_sp', value);
    }

    /**
     * Sets the rate_sp at which the servo travels from 0 to 100.0% (half of the full
     * range of the servo). Units are in milliseconds. Example: Setting the rate_sp
     * to 1000 means that it will take a 180 degree servo 2 second to move from 0
     * to 180 degrees. Note: Some servo controllers may not support this in which
     * case reading and writing will fail with `-EOPNOTSUPP`. In continuous rotation
     * servos, this value will affect the rate_sp at which the speed ramps up or down.
     */
    get rateSp(): number {
        return this.readPropertyAsNumber('rate_sp');
    }

    set rateSp(value: number) {
        this.setPropertyFromNumber('rate_sp', value);
    }

    /**
     * Returns a list of flags indicating the state of the servo.
     * Possible values are:
     * * `running`: Indicates that the motor is powered.
     */
    protected get state(): string[] {
        return this.readPropertyAsArray('state');
    }

    /**
     * Sets the command for the servo. Valid values are `run` and `float`. Setting
     * to `run` will cause the servo to be driven to the position_sp set in the
     * `position_sp` attribute. Setting to `float` will remove power from the motor.
     */
    protected set command(value: ServoCommand) {
        this.setProperty('command', value);
    }

    run() {
        this.command = ServoCommand.RUN;
    }

    stop() {
        this.command = ServoCommand.FLOAT;
    }

}

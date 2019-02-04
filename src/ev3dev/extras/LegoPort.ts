import { Device } from '../io'

/**
 * The `lego-port` class provides an interface for working with input and
 * output ports that are compatible with LEGO MINDSTORMS RCX/NXT/EV3, LEGO
 * WeDo and LEGO Power Functions sensors and motors. Supported devices include
 * the LEGO MINDSTORMS EV3 Intelligent Brick, the LEGO WeDo USB hub and
 * various sensor multiplexers from 3rd party manufacturers.
 *
 * Some types of ports may have multiple modes of operation. For example, the
 * input ports on the EV3 brick can communicate with sensors using UART, I2C
 * or analog validate signals - but not all at the same time. Therefore there
 * are multiple modes available to connect to the different types of sensors.
 *
 * In most cases, ports are able to automatically detect what type of sensor
 * or motor is connected. In some cases though, this must be manually specified
 * using the `mode` and `set_device` attributes. The `mode` attribute affects
 * how the port communicates with the connected device. For example the input
 * ports on the EV3 brick can communicate using UART, I2C or analog voltages,
 * but not all at the same time, so the mode must be set to the one that is
 * appropriate for the connected sensor. The `set_device` attribute is used to
 * specify the exact type of sensor that is connected. Note: the mode must be
 * correctly set before setting the sensor type.
 *
 * Ports can be found at `/sys/class/lego-port/port<N>` where `<N>` is
 * incremented each time a new port is registered. Note: The number is not
 * related to the actual port at all - use the `address` attribute to find
 * a specific port.
 */
export class LegoPort extends Device {
	/**
	 * Construct
	 */
	constructor(port: string) {
		super()
		this.connect('lego-port', 'port(d*)', {
			port_name: port
		})
	}

	protected _deviceIndex: number = -1

	get deviceIndex(): number {
		return this._deviceIndex
	}

	/**
	 * Returns the name of the port. See individual driver documentation for
	 * the name that will be returned.
	 */
	get address(): string {
		return this.readProperty('address')
	}

	/**
	 * Returns the name of the driver that loaded this device. You can find the
	 * complete list of drivers in the [list of port drivers].
	 */
	get driverName(): string {
		return this.readProperty('driver_name')
	}

	/**
	 * Returns a list of the available modes of the port.
	 */
	get modes(): string[] {
		return this.readPropertyAsArray('modes')
	}

	/**
	 * Reading returns the currently selected mode. Writing sets the mode.
	 * Generally speaking when the mode changes any sensor or motor devices
	 * associated with the port will be removed new ones loaded, however this
	 * this will depend on the individual driver implementing this class.
	 */
	get mode(): string {
		return this.readProperty('mode')
	}

	/**
	 * Reading returns the currently selected mode. Writing sets the mode.
	 * Generally speaking when the mode changes any sensor or motor devices
	 * associated with the port will be removed new ones loaded, however this
	 * this will depend on the individual driver implementing this class.
	 */
	set mode(value: string) {
		this.setProperty('mode', value)
	}

	/**
	 * For modes that support it, writing the name of a driver will cause a new
	 * device to be registered for that driver and attached to this port. For
	 * example, since NXT/Analog sensors cannot be auto-detected, you must use
	 * this attribute to load the correct driver. Returns -EOPNOTSUPP if setting a
	 * device is not supported.
	 */
	set setDevice(value: string) {
		this.setProperty('set_device', value)
	}

	/**
	 * In most cases, reading status will return the same value as `mode`. In
	 * cases where there is an `auto` mode additional values may be returned,
	 * such as `no-device` or `error`. See individual port driver documentation
	 * for the full list of possible values.
	 */
	get status(): string {
		return this.readProperty('status')
	}
}

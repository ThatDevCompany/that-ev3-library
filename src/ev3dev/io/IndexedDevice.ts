import { Device } from './Device'

/**
 * An extention of the basic Device class for an indexable group of devices
 * (namely, an array of sensors or an array of motors)
 */
export class IndexedDevice extends Device {
	/**
	 * Constructor
	 */
	constructor(
		driverTypeDirName: string,
		nameConvention?: string,
		targetAddress?: string,
		targetDriverName?: string | string[]
	) {
		super()

		// Set up Property constraints
		const propertyConstraints: { [propertyName: string]: any } = {}

		if (targetAddress !== undefined) {
			propertyConstraints['address'] = targetAddress
		}

		if (targetDriverName !== undefined) {
			propertyConstraints['driver_name'] = [].concat(targetDriverName)
		}

		// Connect to the Device Group folder
		this.connect(driverTypeDirName, nameConvention, propertyConstraints)

		// Once connected, determine how many actual devices are in it
		if (this.connected) {
			const matches = new RegExp('(\\d+)', 'g').exec(this._deviceDirName)

			if (matches != null && matches[0] !== undefined) {
				this._deviceIndex = Number(matches[1])
			}
		}
	}

	/**
	 * Returns the number of devices in the group
	 */
	private _deviceIndex: number = -1
	get deviceIndex(): number {
		return this._deviceIndex
	}
}

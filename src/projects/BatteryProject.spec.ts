import { BatteryProject } from './BatteryProject'

describe('BatteryProject', () => {
	it('should be an object', () => {
		expect(typeof BatteryProject).toEqual('object')
	})

	it('should contain a name', () => {
		expect(BatteryProject.hasOwnProperty('name')).toBeTruthy()
	})
})

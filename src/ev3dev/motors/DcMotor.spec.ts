import { DcMotor } from './DcMotor'

describe('DcMotor', () => {
	it('should be instantiable', () => {
		expect(new DcMotor('test')).toBeDefined()
	})
})

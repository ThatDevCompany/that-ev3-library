import { ServoMotor } from './ServoMotor'

describe('ServoMotor', () => {
	it('should be instantiable', () => {
		expect(new ServoMotor('test')).toBeDefined()
	})
})

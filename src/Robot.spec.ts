import { Robot } from './Robot'

describe('Robot', () => {
	it('should be instantiable', () => {
		const robot = new Robot()
		expect(robot).toBeDefined()
	})

	it('should fail without error if no project provided', () => {
		const robot = new Robot()
		robot.run()
		expect(true).toBeTruthy()
	})
})

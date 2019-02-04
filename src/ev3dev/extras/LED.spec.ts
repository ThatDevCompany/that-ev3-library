import { LED } from './LED'

describe('LED', () => {
	it('should be instantiable', () => {
		expect(new LED('test')).toBeDefined()
	})
})

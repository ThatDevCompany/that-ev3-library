import { EventHandler } from './EventHandler'

describe('EventHandler', () => {
	it('should be instantiable', () => {
		expect(new EventHandler(() => {}, (): boolean => false)).toBeDefined()
	})
})

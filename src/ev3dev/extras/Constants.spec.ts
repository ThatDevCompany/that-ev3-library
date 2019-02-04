import { Input, Output, Polarity } from './Constants'

describe('Constants', () => {
	it('should define Polarity ', () => {
		expect(Polarity.NORMAL).toEqual('normal')
		expect(Polarity.INVERSED).toEqual('inversed')
	})
})

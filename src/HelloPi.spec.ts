import {HelloPi} from './HelloPi';

describe('HelloPi', () => {

	it('should be instantiable', () => {
		const test = new HelloPi();
		expect(true).toBeTruthy();
	})

});

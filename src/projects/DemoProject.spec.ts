import {DemoProject} from './DemoProject';

describe('DemoProject', () => {

	it('should contain a name', () => {
		expect(DemoProject.hasOwnProperty('name')).toBeTruthy();
	})

});

import {DemoProject} from './DemoProject';

describe('DemoProject', () => {

    it('should be an object', () => {
        expect(typeof DemoProject).toEqual('object');
    });

    it('should contain a name', () => {
		expect(DemoProject.hasOwnProperty('name')).toBeTruthy();
	})

});

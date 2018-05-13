import {FadeLedProject} from './FadeLedProject';

describe('FadeLedProject', () => {

    it('should be an object', () => {
        expect(typeof FadeLedProject).toEqual('object');
    });

    it('should contain a name', () => {
		expect(FadeLedProject.hasOwnProperty('name')).toBeTruthy();
	})

});

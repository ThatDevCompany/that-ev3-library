import {TachoMotor} from './TachoMotor';

describe('TachoMotor', () => {

    it('should be instantiable', () => {
        expect(new TachoMotor('test')).toBeDefined();
    });

});

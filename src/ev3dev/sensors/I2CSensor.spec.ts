import {I2CSensor} from './I2CSensor';

describe('I2CSensor', () => {

    it('should be instantiable', () => {
        expect(new I2CSensor('test')).toBeDefined();
    });

});

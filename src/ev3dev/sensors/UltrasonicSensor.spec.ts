import {UltrasonicSensor} from './UltrasonicSensor';

describe('UltrasonicSensor', () => {

    it('should be instantiable', () => {
        expect(new UltrasonicSensor('test')).toBeDefined();
    });

});

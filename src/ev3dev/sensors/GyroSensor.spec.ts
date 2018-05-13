import {GyroSensor} from './GyroSensor';

describe('GyroSensor', () => {

    it('should be instantiable', () => {
        expect(new GyroSensor('test')).toBeDefined();
    });

});

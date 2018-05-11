import * as EV3 from './index';

describe('E2E', () => {

	it('should be able to run the DemoProject', () => {
		const robot = new EV3.Robot();
		robot.load(EV3.DemoProject);
		robot.run();
	});

});

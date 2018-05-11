import * as EV3 from './index';

describe('E2E', () => {

	it('should be able to run the DemoProject', () => {
		const robot = new EV3.Robot();
		robot.load(EV3.DemoProject);
		robot.run();
	});

	it('should be log an error if trying to run without a project', () => {
		const robot = new EV3.Robot();
		robot.run();
	});

});

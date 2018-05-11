import {IProject} from './projects/IProject';

/**
 * The primary ROBOT class which will run and coordinate EV3 projects
 */
export class Robot {

	/**
	 * Properties
	 */
	private _project: IProject;

	/**
	 * Load Project
	 */
	load(project: IProject): void {
		this._project = project;
	}

	/**
	 * Run Project
	 */
	run(): void {
		const p = this._project;
		if (!p) {
			console.warn('Must load a project first. Run robot.load(project) and try again.');
			return;
		}

		console.log('Running ' + p.name);
		p.run();
	}

}

/**
 * The primary Interface for a EV3 Project
 */
export interface IProject {

	/**
	 * The Name of the Project
	 */
	name: string;

	run(): void;

}

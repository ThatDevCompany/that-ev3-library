/**
 * The primary Interface for a EV3 Project
 */
export interface IProject {
	/**
	 * The Name of the Project
	 */
	name: string

	run(): void
}

/**
 * A abstract implementation of the IProject interface
 */
export abstract class AbstractProject implements IProject {
	name: string
	run() {}
}

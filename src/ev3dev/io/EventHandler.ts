/**
 * Event Processor class
 */
export class EventHandler {

    /**
     * Constructor
     */
    constructor(
        private callbackFunction: (err?: Error) => void,
        private eventPredicate: (userData?: any) => boolean,
        private firstTriggerOnly: boolean = true,
        private userData?: any
    ) {}

    /**
     * Calls this event's predicate and invokes its callback if the
     * predicate signals for the event to fire. Returns a boolean
     * indicating whether the event should continue to be updated.
     */
    update(): boolean {

        try {

            // If the event has fired
            if (this.eventPredicate(this.userData)) {
                // Perform the callback
                this.callbackFunction();
                // Return TRUE if we should keep listening for the event
                // Or FALSE if we should stop now
                return !this.firstTriggerOnly;
            }

        } catch (e) {

            // Error callback and stop the listener
            this.callbackFunction(e);
            return false;

        }

        return true;

    }
}

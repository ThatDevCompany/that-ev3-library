export class EventNotificationRequest {
    private callbackFunction: (err?: Error) => void;
    private eventPredicate: (userData?: any) => boolean;
    private userData: any;
    private firstTriggerOnly: boolean;

    constructor(callbackFunction: (err?: Error) => void, eventPredicate: (userData?: any) => boolean, firstTriggerOnly: boolean = true, userData?: any) {
        this.callbackFunction = callbackFunction;
        this.eventPredicate = eventPredicate;
        this.userData = userData;

        this.firstTriggerOnly = firstTriggerOnly;
    }

    /**
     * Calls this event's predicate and invokes its callback if the
     * predicate signals for the event to fire. Returns a boolean
     * indicating whether the event should continue to be updated.
     */
    public handleUpdate(): boolean {

        let predicateResult: boolean;

        try {
            predicateResult = this.eventPredicate(this.userData)
        } catch (e) {
            this.callbackFunction(e);
            return false;
        }

        if (predicateResult) {
            this.callbackFunction();

            if (this.firstTriggerOnly) {
                return false;
            }
        }

        return true;
    }
}

/**
 * Queue event manager
 * - Manages update and rendering event
 * - ### Uses the queue to manage events
 * @classdesc Queue event manager to use the queue to manage events
 */
class QueueEventManager extends EventManager { // eslint-disable-line  no-unused-vars
    /**
     * Queue event manager constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Event queue
         * @protected
         * @type {Array<GameEvent>}
         */
        this.events = [];
    }

    /**
     * Enqueue event for preparing to run it
     * @override
     * @param {GameEvent} event Event
     */
    enqueueEvent(event) {
        if (this.events.length == 0) {
            event.init();
        }
        this.events.push(event);
    }

    /**
     * Dequeue event for preparing to remove it
     * @override
     */
    dequeueEvent() {
        this.events.splice(0, 1);
        if (this.events.length != 0) {
            this.getEvent().init();
        }
    }

    /**
     * Get currently running event
     * @override
     * @protected
     * @return {GameEvent} Running event (if it not exists, return null)
     */
    getEvent() {
        return this.events.length == 0 ? null : this.events[0];
    }
}

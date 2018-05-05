/**
 * Queue event manager
 * - Manages update and rendering event
 * - Controls event
 * - Registers event
 * - ### Uses the queue to manage events
 * @extends {EventManager}
 * @implements {IEventRegister}
 * @implements {IEventOperator}
 * @classdesc Queue event manager to use the queue to manage events
 */
class QueueEventManager extends EventManager /* , IEventRegister, IEventOperator */ { // eslint-disable-line  no-unused-vars
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

        /**
         * List of running events
         * @protected
         * @type {Array<GameEvent>}
         */
        this.runningEvents = [];
    }

    /**
     * Register event
     * @override
     * @param {GameEvent} event Target vent
     */
    register(event) {
        event.setEventOperator(this);
        this.events.push(event);
        // if event is first event, execute it
        if (this.events.length == 1) {
            this.next();
        }
    }

    /**
     * Unregister event
     * @override
     * @param {GameEvent} event Target vent
     */
    unregister(event) {
        let index = this.events.indexOf(event);
        if (index >= 0) {
            this.events.splice(index, 1);
        }
        index = this.runningEvents.indexOf(event);
        if (index >= 0) {
            this.runningEvents.splice(index, 1);
            event.destruct();
        }
    }

    /**
     * Execute next event
     * @override
     */
    next() {
        let event = this.events[0];
        if (event !== undefined) {
            this.events.splice(0, 1);
            this.runningEvents.push(event);
            event.init();
        }
    }

    /**
     * Delete event
     * @override
     * @param {GameEvent} event Target event
     */
    delete(event) {
        this.unregister(event);
    }

    /**
     * Get currently running event
     * @override
     * @return {Array<GameEvent>} Currently running events
     */
    getRunningEvents() {
        return this.runningEvents;
    }

    /**
     * Clear all events
     * @override
     */
    clear() {
        for (let list of [this.events, this.runningEvents]) {
            for (let it of list) {
                it.destruct();
            }
        }
        this.events.length = 0;
        this.runningEvents.length = 0;
    }

    /**
     * Remove events from event manager
     * @protected
     * @param {Array<GameEvent>} removes List of event for removing
     */
    removeEvents(removes) {
        for (let it of removes) {
            this.unregister(it);
        }
    }
}

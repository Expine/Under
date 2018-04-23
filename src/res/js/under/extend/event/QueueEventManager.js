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

        /**
         * Updating events list
         * @protected
         * @type {Array<GameEvent>}
         */
        this.updatingEvents = [];
        /**
         * Rendering events list
         * @protected
         * @type {Array<GameEvent>}
         */
        this.renderingEvents = [];
    }

    /**
     * Execute event
     * @override
     * @param {GameEvent} event Event
     */
    execute(event) {
        event.setEventOperator(this);
        this.events.push(event);
        if (this.updatingEvents.length == 0 && this.renderingEvents.length == 0) {
            this.next();
        }
    }

    /**
     * Execute next event
     * @override
     */
    next() {
        let event = this.events[0];
        if (event !== undefined) {
            this.updatingEvents.push(event);
            this.renderingEvents.push(event);
            event.init();
            this.events.splice(0, 1);
        }
    }

    /**
     * Stop event update
     * @override
     * @param {GameEvent} event Target event
     */
    stopUpdate(event) {
        let index = this.updatingEvents.indexOf(event);
        if (index != -1) {
            this.updatingEvents.splice(index, 1);
        }
    }

    /**
     * Stop event rendering
     * @override
     * @param {GameEvent} event Target event
     */
    stopRender(event) {
        let index = this.renderingEvents.indexOf(event);
        if (index != -1) {
            this.renderingEvents.splice(index, 1);
        }
    }

    /**
     * Get running events by name
     * @override
     * @param {name} Event name
     * @return {Array<GameEvent>} Running events that has name
     */
    getRunningEventsByName(name) {
        let ret = [];
        for (let it of this.updatingEvents) {
            if (name == it.getName() && ret.indexOf(it) == -1) {
                ret.push(it);
            }
        }
        for (let it of this.renderingEvents) {
            if (name == it.getName() && ret.indexOf(it) == -1) {
                ret.push(it);
            }
        }
        return ret;
    }

    /**
     * Get currently updating event
     * @override
     * @protected
     * @return {Array<GameEvent>} Updating events
     */
    getUpdatingEvents() {
        return this.updatingEvents;
    }

    /**
     * Get currently rendering event
     * @override
     * @protected
     * @return {Array<GameEvent>} Rendering events
     */
    getRenderingEvents() {
        return this.renderingEvents;
    }
}

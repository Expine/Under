/**
 * Event operator interface
 * - ### Controls event
 * @classdesc Event operator interface to control event
 */
class IEventOperator extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Execute next event
     * @interface
     */
    next() {}

    /**
     * Stop event update
     * @interface
     * @param {GameEvent} event Target event
     */
    stopUpdate(event) {}

    /**
     * Stop event rendering
     * @interface
     * @param {GameEvent} event Target event
     */
    stopRender(event) {}

    /**
     * Get running events by name
     * @interface
     * @param {name} Event name
     * @return {Array<GameEvent>} Running events that has name
     */
    getRunningEventsByName(name) {}
}

/**
 * Event operator interface
 * - ### Controls event
 * @interface
 * @classdesc Event operator interface to control event
 */
class IEventOperator extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Execute next event
     * @abstract
     */
    next() {}

    /**
     * Stop event update
     * @abstract
     * @param {GameEvent} event Target event
     */
    stopUpdate(event) {}

    /**
     * Stop event rendering
     * @abstract
     * @param {GameEvent} event Target event
     */
    stopRender(event) {}

    /**
     * Get running events by name
     * @abstract
     * @param {name} Event name
     * @return {Array<GameEvent>} Running events that has name
     */
    getRunningEventsByName(name) {}
}

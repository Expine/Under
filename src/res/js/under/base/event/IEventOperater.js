/**
 * Event operator interface
 * - ### Controls event
 * @interface
 * @classdesc Event operator interface to control event
 */
class IEventOperator extends Interface {
    /**
     * Execute next event
     * @abstract
     */
    next() {}

    /**
     * Delete event
     * @abstract
     * @param {GameEvent} event Target event
     */
    delete(event) {}

    /**
     * Get currently running event
     * @abstract
     * @return {Array<GameEvent>} Currently running events
     */
    getRunningEvents() {}
}

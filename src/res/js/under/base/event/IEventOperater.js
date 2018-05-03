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
     * Get currently running event
     * @abstract
     * @return {Array<GameEvent>} Currently running events
     */
    getRunningEvents() {}
}

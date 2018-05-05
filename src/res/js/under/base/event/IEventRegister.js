/**
 * Event register interface
 * - ### Registers event
 * @interface
 * @classdesc Event register interface to registers event
 */
class IEventRegister extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Register event
     * @abstract
     * @param {GameEvent} event Target event
     */
    register(event) {}

    /**
     * Unregister event
     * @abstract
     * @param {GameEvent} event Target event
     */
    unregister(event) {}

    /**
     * Clear all events
     * @abstract
     */
    clear() {}
}

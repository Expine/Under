/**
 * Event entity interface
 * - ### It can hold event and fire it
 * @interface
 * @classdesc Event entity interface that can hold event and fire it
 */
class IEventEntity extends Interface {
    /**
     * Set game event
     * @abstract
     * @param {GameEvent} event Stage event
     */
    setEvent(event) {}

    /**
     * Get stage event
     * @abstract
     * @return {GameEvent} Stage event
     */
    getEvent() {}

    /**
     * Fires event
     * @abstract
     */
    fire() {}
}

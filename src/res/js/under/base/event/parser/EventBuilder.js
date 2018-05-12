/**
 * Event builder
 * - ### Generates event from json data
 * @interface
 * @classdesc Event builder to generate event
 */
class EventBuilder { // eslint-disable-line  no-unused-vars
    /**
     * Build event from json data
     * @abstract
     * @param {JSON} json Event json data
     * @return {GameEvent} Generated event
     */
    build(json) {}
}

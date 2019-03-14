/**
 * Event builder
 * - ### Generates event from json data
 * @interface
 * @classdesc Event builder to generate event
 */
class EventBuilder {
    /**
     * Entity builder constructor
     * @constructor
     */
    constructor() {
        this.imageBuilder = null;
    }

    /**
     * Set image builder
     * @param {ImageBuilder} image Image builder
     */
    setImageBuilder(image) {
        this.imageBuilder = image;
    }

    /**
     * Build event from json data
     * @abstract
     * @param {JSON} json Event json data
     * @return {GameEvent} Generated event
     */
    build(json) {}
}

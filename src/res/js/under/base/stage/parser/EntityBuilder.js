/**
 * Entity builder
 * - ### Generates entity from json data
 * @interface
 * @classdesc Entity builder to generate entity
 */
class EntityBuilder { // eslint-disable-line  no-unused-vars
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
     * Build entity from json data
     * @abstract
     * @param {JSON} deploy Entity deploy json data
     * @param {JSON} json Entity json data
     * @return {Entity} Generated entity
     */
    build(deploy, json) {}
}

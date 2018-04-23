/**
 * Entity builder
 * - ### Generates entity from json data
 * @interface
 * @classdesc Entity builder to generate entity
 */
class EntityBuilder { // eslint-disable-line  no-unused-vars
    /**
     * Build enity from json data
     * @abstract
     * @param {number} x Entity x position
     * @param {number} y Entity Y position
     * @param {JSON} json Entity json data
     * @return {Entity} Generated entity
     */
    build(x, y, json) {}
}

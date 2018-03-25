/**
 * Generate entity from json data
 * Has json data parsing
 * @classdesc Builder to generate entity
 */
class EntityBuilder { // eslint-disable-line  no-unused-vars
    /**
     * Build enity from json data
     * @interface
     * @param {number} x Entity x position
     * @param {number} y Entity y position
     * @param {json} json Entity json data
     * @return {Entity} Generated entity
     */
    build(x, y, json) {}
}

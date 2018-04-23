/**
 * Entity builder
 * - ### Generates entity from json data
 * @interface
 * @classdesc Entity builder to generate entity
 */
class EntityBuilder { // eslint-disable-line  no-unused-vars
    /**
     * Build entity from json data
     * @abstract
     * @param {JSON} deploy Entity deploy json data
     * @param {JSON} json Entity json data
     * @return {Entity} Generated entity
     */
    build(deploy, json) {}
}

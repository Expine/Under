/**
 * Entity factory
 * - ### Generates entity by ID
 * @interface
 * @classdesc Entity factory to generate entity by ID
 */
class EntityFactory { // eslint-disable-line  no-unused-vars
    /**
     * Create entity from factory data
     * @abstract
     * @param {Object} id ID for entity
     * @param {JSON} deploy Entity deploy json data
     * @return {Entity} Entity instance
     */
    createEntity(id, deploy) {}
}

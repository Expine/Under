/**
 * Physical world for performing a physical operation
 * Receive a list of entities and apply a physical operation
 * @classdesc Physical world for performing a physical operation
 */
class PhysicalWorld { // eslint-disable-line  no-unused-vars
    /**
     * Physical world constructor
     * @constructor
     * @param {number} gravity gravity of the world
     */
    constructor(gravity) {
        /**
         * Gravity power
         * @protected
         * @type {number}
         */
        this.gravity = gravity * 50;
    }

    /**
     * Set response instance for collision response
     * @param {CollisionResponse} response Collision response instance
     */
    setResponse(response) {
        /**
         * Collision response instance
         * @protected
         * @type {CollisionResponse}
         */
        this.response = response;
    }

    /**
     * Add entity as actior
     * @interface
     * @param {Entity} actor Entity as actor
     */
    addActor(actor) {}

    /**
     * Add entity in physical world
     * @interface
     * @param {Entity} entity Entity in physical world
     */
    addEntity(entity) {}

    /**
     * Remove entity from physical world
     * @interface
     * @param {Entity} entity Entity to remove from physical world
     */
    removeEntity(entity) {}

    /**
     * Update physical world
     * @interface
     * @param {number} dt Delta time
     */
    update(dt) {}
}

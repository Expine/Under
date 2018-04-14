/**
 * Physical world
 * - ### Performs a physical operation
 * - ### Registers entities and apply a physical operation
 * @classdesc Physical world to perform a physical operation by registering entities
 */
class PhysicalWorld { // eslint-disable-line  no-unused-vars
    /**
     * Physical world constructor
     * @constructor
     * @param {number} gravity Gravity of the world
     */
    constructor(gravity) {
        /**
         * Gravity power
         * @protected
         * @type {number}
         */
        this.gravity = gravity * 100;

        /**
         * Collision response instance
         * @protected
         * @type {CollisionResponse}
         */
        this.response = null;
    }

    /**
     * Set response instance for collision response
     * @param {CollisionResponse} response Collision response instance
     */
    setResponse(response) {
        this.response = response;
    }

    /**
     * Get response instance for collision response
     * @return {CollisionResponse} Collision response instance
     */
    getResponse() {
        return this.response;
    }

    /**
     * Add entity as actior
     * @interface
     * @param {MutableEntity} actor Entity as actor
     */
    addActor(actor) {}

    /**
     * Add entity in physical world
     * @interface
     * @param {InfluentialEntity} entity Entity in physical world
     */
    addEntity(entity) {}

    /**
     * Remove entity from physical world
     * @interface
     * @param {InfluentialEntity} entity Entity to remove from physical world
     */
    removeEntity(entity) {}

    /**
     * Get collision information now
     * @interface
     * @return {Array<CollisionData>} Collision information now
     */
    getCollisionData(entity) {}

    /**
     * Get the total number of collisions
     * @interface
     * @return {number} Total number of collisions
     */
    getCollisionSize() {}

    /**
     * Update external force
     * @interface
     * @protected
     * @param {number} dt Delta time
     */
    updateExternalForce(dt) {}

    /**
     * Update body
     * @interface
     * @protected
     * @param {number} dt Delta time
     */
    updateBody(dt) {}

    /**
     * Update body to cleanup
     * @interface
     * @protected
     * @param {number} dt Delta time
     */
    updateBodyCleanup(dt) {}

    /**
     * Update collisions
     * @interface
     * @protected
     * @param {number} dt Delta time
     */
    updateCollision(dt) {}

    /**
     * Update collisions response
     * @interface
     * @protected
     * @param {number} dt Delta time
     */
    updateResponse(dt) {}

    /**
     * Update physical world
     * @interface
     * @protected
     * @param {number} dt Delta time
     */
    update(dt) {
        this.updateExternalForce(dt);
        this.updateBody(dt);
        this.updateBodyCleanup(dt);
        this.updateCollision(dt);
        this.updateResponse(dt);
    }
}

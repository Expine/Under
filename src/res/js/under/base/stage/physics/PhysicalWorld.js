/**
 * Physical world
 * - ### Performs a physical operation
 * - ### Registers entities and apply a physical operation
 * @interface
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
     * Add entity in physical world
     * @abstract
     * @param {InfluentialEntity} entity Entity in physical world
     */
    addEntity(entity) {}

    /**
     * Remove entity from physical world
     * @abstract
     * @param {InfluentialEntity} entity Entity to remove from physical world
     */
    removeEntity(entity) {}

    /**
     * Get collision information now
     * @abstract
     * @param {InfluentialEntity} entity Target entity
     * @return {Array<CollisionData>} Collision information now
     */
    getCollisionData(entity) {}

    /**
     * Get the total number of collisions
     * @abstract
     * @return {number} Total number of collisions
     */
    getCollisionSize() {}

    /**
     * Update external force
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    updateExternalForce(dt) {}

    /**
     * Prepare body
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    prepareBody(dt) {}

    /**
     * Update body
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    updateBody(dt) {}

    /**
     * Update body to cleanup
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    updateBodyCleanup(dt) {}

    /**
     * Update collisions
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    updateCollision(dt) {}

    /**
     * Update collisions response
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    updateResponse(dt) {}

    /**
     * Update physical world
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    update(dt) {
        this.updateExternalForce(dt);
        this.prepareBody(dt);
        this.updateBody(dt);
        this.updateBodyCleanup(dt);
        this.updateCollision(dt);
        this.updateResponse(dt);
    }
}

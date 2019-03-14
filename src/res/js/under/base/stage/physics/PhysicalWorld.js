/**
 * Physical world
 * - ### Performs a physical operation
 * - ### Registers entities and apply a physical operation
 * @interface
 * @classdesc Physical world to perform a physical operation by registering entities
 */
class PhysicalWorld {
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
     * @param {Collider} collider Target collider
     * @return {Array<CollisionData>} Collision information now
     */
    getCollisionData(collider) {}

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
     * Initialize collision state
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    initCollision(dt) {}

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
     * Judge whether collision detection continue or not
     * @abstract
     * @protected
     * @param {number} dt Delta time
     * @return {boolean} Whether collision detection continue or not
     */
    judgeContinueCollision(dt) {}

    /**
     * Cleanup all information
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    cleanup(dt) {}

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
        this.initCollision(dt);
        do {
            this.updateCollision(dt);
            this.updateResponse(dt);
        } while (this.judgeContinueCollision(dt));
        this.cleanup(dt);
    }

    /**
     * Render world
     * @abstract
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     */
    render(ctx, shiftX, shiftY) {}
}

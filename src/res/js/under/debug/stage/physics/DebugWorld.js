/**
 * Debug world
 * - Performs a physical operation
 * - Registers entities and apply a physical operation
 * - ### Measure time for debugging by delegation
 * @extends {PhysicalWorld}
 * @classdesc Debug world to measure time for debugging by delegation
 */
class DebugWorld extends PhysicalWorld { // eslint-disable-line  no-unused-vars
    /**
     * Debug world constructor
     * @param {PhysicalWorld} world Original world for delegation
     * @constructor
     */
    constructor(world) {
        super(world.gravity);

        /**
         * Original world for delegation
         * @protected
         * @type {PhysicalWorld}
         */
        this.world = world;
    }
    /**
     * Set response instance for collision response
     * @override
     * @param {CollisionResponse} response Collision response instance
     */
    setResponse(response) {
        this.world.setResponse(response);
    }

    /**
     * Get response instance for collision response
     * @return {CollisionResponse} Collision response instance
     */
    getResponse() {
        return this.world.getResponse();
    }

    /**
     * Add entity in physical world
     * @override
     * @param {InfluentialEntity} entity Entity in physical world
     */
    addEntity(entity) {
        this.world.addEntity(entity);
    }

    /**
     * Remove entity from physical world
     * @override
     * @param {InfluentialEntity} entity Entity to remove from physical world
     */
    removeEntity(entity) {
        this.world.removeEntity(entity);
    }

    /**
     * Get collision information now
     * @override
     * @param {Collider} collider Target collider
     * @return {Array<CollisionData>} Collision information now
     */
    getCollisionData(collider) {
        return this.world.getCollisionData(collider);
    }

    /**
     * Get the total number of collisions
     * @override
     * @return {number} Total number of collisions
     */
    getCollisionSize() {
        return this.world.getCollisionSize();
    }

    /**
     * Update external force
     * @protected
     * @override
     * @param {number} dt Delta time
     */
    updateExternalForce(dt) {
        Timer.it.startTimer(`external`);
        this.world.updateExternalForce(dt);
        Timer.it.stopTimer(`external`);
    }

    /**
     * Prepare body
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    prepareBody(dt) {
        Timer.it.startTimer(`body`);
        this.world.prepareBody(dt);
    }

    /**
     * Update body
     * @protected
     * @override
     * @param {number} dt Delta time
     */
    updateBody(dt) {
        this.world.updateBody(dt);
    }

    /**
     * Update body to cleanup
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateBodyCleanup(dt) {
        this.world.updateBodyCleanup(dt);
        Timer.it.stopTimer(`body`);
    }

    /**
     * Initialize collision state
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    initCollision(dt) {
        Timer.it.startTimer(`collide`);
        this.world.initCollision(dt);
    }

    /**
     * Update collisions
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateCollision(dt) {
        this.world.updateCollision(dt);
        Timer.it.stopTimer(`collide`);
    }

    /**
     * Update collisions response
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateResponse(dt) {
        Timer.it.startTimer(`response`);
        this.world.updateResponse(dt);
        Timer.it.stopTimer(`response`);
    }

    /**
     * Cleanup all information
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    cleanup(dt) {
        this.world.cleanup();
    }
}
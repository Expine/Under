/**
 * Debug world
 * - Performs a physical operation
 * - Registers entities and apply a physical operation
 * - ### Measure time for debugging by delegation
 * @extends {PhysicalWorld}
 * @classdesc Debug world to measure time for debugging by delegation
 */
class DebugWorld extends PhysicalWorld {
    /**
     * Debug world constructor
     * @constructor
     * @param {PhysicalWorld} world Original world for delegation
     * @param {number} stageWidth Stage width (pixel)
     * @param {number} stageHeight Stage height (pixel)
     */
    constructor(world, stageWidth, stageHeight) {
        super(world.gravity);

        /**
         * Original world for delegation
         * @protected
         * @type {PhysicalWorld}
         */
        this.world = world;

        /**
         * Stage width (pixel)
         * @protected
         * @type {number}
         */
        this.stageWidth = stageWidth;
        /**
         * Stage height (pixel)
         * @protected
         * @type {number}
         */
        this.stageHeight = stageHeight;

        /**
         * Counter for judging
         * @protected
         * @type {number}
         */
        this.judgeCount = 0;
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
     * @override
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
        this.judgeCount = 0;
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
    }

    /**
     * Update collisions response
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateResponse(dt) {
        this.world.updateResponse(dt);
    }

    /**
     * Judge whether collision detection continue or not
     * @override
     * @protected
     * @param {number} dt Delta time
     * @return {boolean} Whether collision detection continue or not
     */
    judgeContinueCollision(dt) {
        this.judgeCount += 1;
        return this.world.judgeContinueCollision(dt);
    }

    /**
     * Cleanup all information
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    cleanup(dt) {
        Timer.it.stopTimer(`collide`);
        this.world.cleanup();
    }

    /**
     * Update physical world
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    update(dt) {
        super.update(dt);
        // Change response (Q)
        if (Input.key.isPress(Input.key.a() + 16)) {
            const response = this.world.getResponse();
            if (response instanceof UnderRepulsionResponse) {
                this.world.setResponse(new RepulsionResponse());
            } else if (response instanceof RepulsionResponse) {
                this.world.setResponse(new ImpulseBasedResponse());
            } else {
                // TODO: Separate from debug
                this.world.setResponse(new UnderRepulsionResponse());
            }
        }
        // Change wprld (W)
        if (Input.key.isPress(Input.key.a() + 22)) {
            const world = this.world instanceof SplitWorld ? new SequentialWorld(this.gravity / 10000) : new SplitWorld(this.stageWidth, this.stageHeight, this.gravity / 10000);
            world.setResponse(this.world.getResponse());
            for (const it of this.world.entities) {
                world.addEntity(it);
            }
            this.world = world;
        }
    }
}

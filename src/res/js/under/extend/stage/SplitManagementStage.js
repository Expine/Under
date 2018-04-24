/**
 * Split management stage
 * - Store stage size
 * - Performs updating and rendering stage
 * - Manages stage element such as entity
 * - ### Dividingly manages entities according to type
 * - ### Do not update immutable objects
 * @implements {Stage}
 * @classdesc Split management stage to manage entities according to type dividingly
 */
class SplitManagementStage extends Stage { // eslint-disable-line  no-unused-vars
    /**
     * Split management stage constructor
     * @constructor
     * @param {number} stageWidth Stage width (pixel)
     * @param {number} stageHeight Stage height (pixel)
     */
    constructor(stageWidth, stageHeight) {
        super(stageWidth, stageHeight);
        /**
         * Mutable entity list for updating and phisical operation
         * @protected
         * @type {Array<MutableEntity>}
         */
        this.mutables = [];
        /**
         * All entity list
         * @protected
         * @type {Array<Entity>}
         */
        this.entities = [];

        /**
         * Playable instance for camera
         * @protected
         * @type {IPlayable}
         */
        this.player = null;
    }

    /**
     * Add entity to stage
     * @override
     * @param {Entity} entity Entity object
     */
    addEntity(entity) {
        // set player
        if (this.player == null && BaseUtil.implementsOf(entity, IPlayable)) {
            this.player = entity;
        }
        // set mutables
        if (entity instanceof MutableEntity) {
            this.mutables.push(entity);
            this.physic.addActor(entity);
        }
        if (entity instanceof InfluentialEntity) {
            this.physic.addEntity(entity);
        }
        this.entities.push(entity);
        // initialize entity
        super.addEntity(entity);
    }

    /**
     * Remove entity from stage
     * @override
     * @param {Entity} entity Entity object
     */
    removeEntity(entity) {
        // remove player
        if (entity === this.player) {
            this.player = null;
        }
        // remove mutables
        if (entity instanceof MutableEntity) {
            this.mutables.splice(this.mutables.indexOf(entity), 1);
        }
        if (entity instanceof InfluentialEntity) {
            this.physic.removeEntity(entity);
        }
        this.entities.splice(this.entities.indexOf(entity), 1);
    }

    /**
     * Get all entities
     * @override
     * @return {Array<Entity>} All entities
     */
    getEntities() {
        return this.entities;
    }

    /**
     * Update entity in stage
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateEntity(dt) {
        for (let it of this.entities) {
            it.update(dt);
        }
    }

    /**
     * Update entity in stage by physical world
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updatePhysics(dt) {
        this.physic.update(dt, this.mutables, this.entities);
    }

    /**
     * Update camera
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateCamera(dt) {
        if (this.player != null) {
            let x = this.player.getCameraX();
            let y = this.player.getCameraY();
            this.camera.setCameraPosition(x, y, this.stageWidth, this.stageHeight);
        }
    }

    /**
     * Render map in stage
     * @override
     * @protected
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     */
    renderMap(ctx, shiftX, shiftY) {
        this.map.render(ctx, shiftX + this.camera.cameraX, this.camera.baseY + this.camera.cameraY);
    }

    /**
     * Render entities in stage
     * @override
     * @protected
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     */
    renderEntity(ctx, shiftX, shiftY) {
        let startX = -this.camera.cameraX;
        let startY = -this.camera.cameraY;
        let endX = startX + this.camera.screenWidth;
        let endY = startY + this.camera.screenHeight;
        for (let it of this.entities) {
            if (it.x + it.width >= startX && it.x < endX && it.y + it.height >= startY && it.y < endY) {
                it.render(ctx, this.camera.baseX - startX, this.camera.baseY - startY);
            }
        }
    }
}

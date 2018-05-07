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
         * Sorted entity for rendering
         * @protected
         * @type {Array<Entity>}
         */
        this.sortedEntity = [];

        /**
         * List of entity that will be removed
         * @protected
         * @type {Array<Entity>}
         */
        this.removeList = [];

        /**
         * Playable instance for camera
         * @protected
         * @type {IPlayable}
         */
        this.player = null;

        /**
         * Whehter initialize is ended or not
         * @protected
         * @type {boolean}
         */
        this.inited = false;
    }

    /**
     * Initialize stage
     * @override
     */
    init() {
        this.inited = true;
        this.sortedEntity = Object.assign([], this.entities).sort((a, b) => {
            return a.z < b.z ? -1 : a.z > b.z ? 1 : 0;
        });
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
        }
        if (entity instanceof InfluentialEntity) {
            this.physic.addEntity(entity);
        }
        this.entities.push(entity);
        // initialize entity
        super.addEntity(entity);
        // sort
        if (this.inited) {
            let index = this.sortedEntity.findIndex((it) => {
                return entity.z < it.z;
            });
            if (index >= 0) {
                this.sortedEntity.splice(index, 0, entity);
            } else {
                this.sortedEntity.push(entity);
            }
        }
    }

    /**
     * Remove entity from stage
     * @override
     * @param {Entity} entity Entity object
     */
    removeEntity(entity) {
        this.removeList.push(entity);
    }

    /**
     * Remove entity from stage immediately
     * @abstract
     * @param {Entity} entity Entity object
     */
    removeEntityImmediately(entity) {
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
        let index = this.entities.indexOf(entity);
        if (index >= 0) {
            this.entities.splice(index, 1);
        }
        index = this.sortedEntity.indexOf(entity);
        if (index >= 0) {
            this.sortedEntity.splice(index, 1);
        }
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
        // remove entity
        for (let entity of this.removeList) {
            this.removeEntityImmediately(entity);
        }
        this.removeList.length = 0;
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
        this.camera.update(dt);
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
        this.map.render(ctx, shiftX + this.camera.cameraX, shiftY + this.camera.cameraY, this.camera.screenWidth, this.camera.screenHeight);
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
        for (let it of this.sortedEntity) {
            if (it.x + it.width >= startX && it.x < endX && it.y + it.height >= startY && it.y < endY) {
                it.render(ctx, this.camera.baseX - startX, this.camera.baseY - startY);
            }
        }
    }

    /**
     * Render world in stage
     * @abstract
     * @protected
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     */
    renderWorld(ctx, shiftX, shiftY) {
        this.physic.render(ctx, shiftX, shiftY);
    }
}

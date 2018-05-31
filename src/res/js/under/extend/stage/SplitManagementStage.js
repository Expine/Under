/**
 * Split management stage
 * - Store stage size
 * - Performs updating and rendering stage
 * - Manages stage element such as entity
 * - ### Dividingly manages entities according to type
 * - ### Do not update immutable objects
 * @extends {Stage}
 * @classdesc Split management stage to manage entities according to type dividingly
 */
class SplitManagementStage extends Stage { // eslint-disable-line  no-unused-vars
    /**
     * Split management stage constructor
     * @constructor
     * @param {string} name Stage name
     * @param {number} stageWidth Stage width (pixel)
     * @param {number} stageHeight Stage height (pixel)
     */
    constructor(name, stageWidth, stageHeight) {
        super(name, stageWidth, stageHeight);
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
         * Intefcae list
         * @protected
         * @type {Object<string, Class>}
         */
        this.interfaceList = {};
        /**
         * Entity list of each interface
         * @protected
         * @type {Object<string, Array<Entity>>}
         */
        this.interfacedEntityList = {};

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

        if (this.player !== null) {
            const x = this.player.getCameraX();
            const y = this.player.getCameraY();
            this.camera.init(x, y);
        }
    }

    /**
     * Add entity to stage
     * @override
     * @param {Entity} entity Entity object
     */
    addEntity(entity) {
        // set player
        if (this.player === null && BaseUtil.implementsOf(entity, IPlayable)) {
            this.player = entity;
        }
        if (entity instanceof InfluentialEntity) {
            this.physic.addEntity(entity);
        }
        this.entities.push(entity);
        // initialize entity
        super.addEntity(entity);
        // sort
        if (this.inited) {
            const index = this.sortedEntity.findIndex((it) => {
                return entity.z < it.z;
            });
            if (index >= 0) {
                this.sortedEntity.splice(index, 0, entity);
            } else {
                this.sortedEntity.push(entity);
            }
        }
        // add
        for (let name in this.interfacedEntityList) {
            if (this.interfacedEntityList.hasOwnProperty(name)) {
                if (BaseUtil.implementsOf(entity, this.interfaceList[name])) {
                    this.interfacedEntityList[name].push(entity);
                }
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
     * @protected
     * @param {Entity} entity Entity object
     */
    removeEntityImmediately(entity) {
        // remove player
        if (entity === this.player) {
            this.player = null;
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
        for (let name in this.interfacedEntityList) {
            if (this.interfacedEntityList.hasOwnProperty(name)) {
                if (BaseUtil.implementsOf(entity, this.interfaceList[name])) {
                    index = this.interfacedEntityList[name].indexOf(entity);
                    if (index >= 0) {
                        this.interfacedEntityList[name].splice(index, 1);
                    }
                }
            }
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
     * Get all entities by interface
     * @override
     * @param {Class} inter Interface for judging
     * @param {boolean} useInstanceOf Whether uses insntaceof or not
     * @return {Array<Entity>} All entities attached that interface
     */
    getEntitiesByInterface(inter, useInstanceOf = false) {
        // check already
        if (this.interfacedEntityList[inter.name] === undefined) {
            this.interfacedEntityList[inter.name] = useInstanceOf ? this.entities.filter((it) => it instanceof inter) : this.entities.filter((it) => BaseUtil.implementsOf(it, inter));
            this.interfaceList[inter.name] = inter;
        }
        return this.interfacedEntityList[inter.name];
    }

    /**
     * Update entity in stage
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateEntity(dt) {
        for (const it of this.entities) {
            it.update(dt);
        }
        // remove entity
        for (const entity of this.removeList) {
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
        this.physic.update(dt);
    }

    /**
     * Update background
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateBackground(dt) {
        this.back.update(dt);
    }

    /**
     * Update camera
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateCamera(dt) {
        if (this.player !== null) {
            const x = this.player.getCameraX();
            const y = this.player.getCameraY();
            this.camera.update(x, y, dt);
        }
    }

    /**
     * Render background in stage
     * @override
     * @protected
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     */
    renderBackground(ctx, shiftX, shiftY) {
        this.back.render(ctx, shiftX + this.camera.cameraX, shiftY + this.camera.cameraY, this.camera.screenWidth, this.camera.screenHeight);
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
        const startX = -this.camera.cameraX;
        const startY = -this.camera.cameraY;
        const endX = startX + this.camera.screenWidth;
        const endY = startY + this.camera.screenHeight;
        for (const it of this.sortedEntity) {
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

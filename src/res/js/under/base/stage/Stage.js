/**
 * Stage
 * - ### Store stage size
 * - ### Performs updating and rendering stage
 * - ### Manages stage element such as entity
 * @interface
 * @classdesc Stage to control stage element
 */
class Stage { // eslint-disable-line  no-unused-vars
    /**
     * Stage constructor
     * @constructor
     * @param {string} name Stage name
     * @param {number} stageWidth Stage width (pixel)
     * @param {number} stageHeight Stage height (pixel)
     */
    constructor(name, stageWidth, stageHeight) {
        /**
         * Stage name
         * @protected
         * @type {string}
         */
        this.name = name;
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
         * Whether to update the stage or not
         * @protected
         * @type {boolean}
         */
        this.enable = true;

        /**
         * Stage background element
         * @protected
         * @type {Background}
         */
        this.back = null;
        /**
         * Stage camera element
         * @protected
         * @type {Camera}
         */
        this.camera = null;
        /**
         * Physical world
         * @protected
         * @type {PhysicalWorld}
         */
        this.physic = null;

        /**
         * Entity factory
         * @protected
         * @type {EntityFactory}
         */
        this.factory = null;
    }

    /**
     * Set background manager
     * @param {Background} back Background manager
     */
    setBackground(back) {
        this.back = back;
        this.back.init();
    }

    /**
     * Set camera
     * @param {Camera} camera Camera
     */
    setCamera(camera) {
        this.camera = camera;
    }

    /**
     * Set physical world
     * @param {PhysicalWorld} physic Physical world
     */
    setPhysicalWorld(physic) {
        this.physic = physic;
    }

    /**
     * Set entity factory
     * @param {EntityFactory} factory Entity factory
     */
    setFactory(factory) {
        this.factory = factory;
    }

    /**
     * Get physical world
     * @return {PhysicalWorld} Physical world
     */
    getPhysicalWorld() {
        return this.physic;
    }

    /**
     * Get camera
     * @return {Camera} Camera of stage
     */
    getCamera() {
        return this.camera;
    }

    /**
     * Get factory
     * @protected
     * @return {EntityFactory} Entity factory
     */
    getFactory() {
        return this.factory;
    }

    /**
     * Set whether to update the stage or not
     * @param {boolean} enable Whether to update the stage or not
     */
    setEnable(enable) {
        this.enable = enable;
    }

    /**
     * Get whether to update the stage or not
     * @return {boolean} Whether to update the stage or not
     */
    getEnable() {
        return this.enable;
    }

    /**
     * Get stage width
     * @return {number} Stage width
     */
    getStageWidth() {
        return this.stageWidth;
    }

    /**
     * Get stage height
     * @return {number} Stage height
     */
    getStageHeight() {
        return this.stageHeight;
    }

    /**
     * Add entity to stage by ID
     * @param {Object} id Added entity ID
     * @param {JSON} deploy Deploy json data
     * @return {Entity} Added entity
     */
    addEntityByID(id, deploy) {
        const ret = this.getFactory().createEntity(id, deploy);
        this.addEntity(ret);
        return ret;
    }

    /**
     * Add entity to stage
     * @param {Entity} entity Entity object
     */
    addEntity(entity) {
        if (entity.stage === null) {
            entity.setStage(this);
        }
        entity.init();
    }

    /**
     * Remove entity from stage
     * @abstract
     * @param {Entity} entity Entity object
     */
    removeEntity(entity) {}

    /**
     * Remove entity from stage immediately
     * @abstract
     * @protected
     * @param {Entity} entity Entity object
     */
    removeEntityImmediately(entity) {}

    /**
     * Get all entities
     * @abstract
     * @return {Array<Entity>} All entities
     */
    getEntities() {}

    /**
     * Get all entities by interface
     * @abstract
     * @param {Class} inter Interface for judging
     * @param {boolean} useInstanceOf Whether uses insntaceof or not
     * @return {Array<Entity>} All entities attached that interface
     */
    getEntitiesByInterface(inter, useInstanceOf = false) {}

    /**
     * Update entity in stage
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    updateEntity(dt) {}

    /**
     * Update entity in stage by physical world
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    updatePhysics(dt) {}

    /**
     * Update background
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    updateBackground(dt) {}

    /**
     * Update camera
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    updateCamera(dt) {}

    /**
     * Initialize stage
     * @abstract
     */
    init() {}

    /**
     * Update stage
     * @param {number} dt Delta time
     */
    update(dt) {
        if (this.getEnable()) {
            this.updateEntity(dt);
            this.updatePhysics(dt);
        }
        this.updateBackground(dt);
        this.updateCamera(dt);
    }

    /**
     * Render background in stage
     * @abstract
     * @protected
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     */
    renderBackground(ctx, shiftX, shiftY) {}

    /**
     * Render entities in stage
     * @abstract
     * @protected
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     */
    renderEntity(ctx, shiftX, shiftY) {}

    /**
     * Render world in stage
     * @abstract
     * @protected
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     */
    renderWorld(ctx, shiftX, shiftY) {}

    /**
     * Render stage
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        shiftX += this.getCamera().baseX;
        shiftY += this.getCamera().baseY;
        this.renderBackground(ctx, shiftX, shiftY);
        this.renderEntity(ctx, shiftX, shiftY);
        this.renderWorld(ctx, shiftX, shiftY);
    }
}

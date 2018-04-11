/**
 * Stage
 * - ### Store stage size
 * - ### Performs updating and rendering stage
 * - ### Manages stage element such as entity
 * @classdesc Stage to control stage element
 */
class Stage { // eslint-disable-line  no-unused-vars
    /**
     * Stage constructor
     * @constructor
     * @param {number} stageWidth Stage width (pixel)
     * @param {number} stageHeight Stage height (pixel)
     */
    constructor(stageWidth, stageHeight) {
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
         * @type {bool}
         */
        this.enable = true;

        /**
         * Stage map element
         * @protected
         * @type {Map}
         */
        this.map = null;
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
    }

    /**
     * Set map manager
     * @param {Map} map Map manager
     */
    setMap(map) {
        this.map = map;
    }

    /**
     * Set camera
     * @param {Camera} map Camera
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
     * Get physical world
     * @return {PhysicalWorld} Physical world
     */
    getPhysicalWorld() {
        return this.physic;
    }

    /**
     * Control stage update
     * @param {bool} enable Whether to update the stage or not
     */
    setEnable(enable) {
        this.enable = enable;
    }

    /**
     * Add entity to stage
     * @interface
     * @param {Entity} entity Entity object
     */
    addEntity(entity) {
        entity.setStage(this);
        entity.init();
    }

    /**
     * Remove entity from stage
     * @interface
     * @param {Entity} entity Entity object
     */
    removeEntity(entity) {}

    /**
     * Get all entities
     * @interface
     * @return {Array<Entity>} All entities
     */
    getEntities() {}

    /**
     * Update entity in stage
     * @interface
     * @protected
     * @param {number} dt Delta time
     */
    updateEntity(dt) {}

    /**
     * Update entity in stage by physical world
     * @interface
     * @protected
     * @param {number} dt Delta time
     */
    updatePhysics(dt) {}

    /**
     * Update camera
     * @interface
     * @protected
     * @param {number} dt Delta time
     */
    updateCamera(dt) {}

    /**
     * Update stage
     * @param {number} dt Delta time
     */
    update(dt) {
        if (!this.enable) {
            return;
        }
        this.updateEntity(dt);
        this.updatePhysics(dt);
        this.updateCamera(dt);
    }

    /**
     * Render map in stage
     * @interface
     * @protected
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     */
    renderMap(ctx, shiftX, shiftY) {}

    /**
     * Render entities in stage
     * @interface
     * @protected
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     */
    renderEntity(ctx, shiftX, shiftY) {}

    /**
     * Render stage
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        shiftX += this.camera.baseX;
        shiftY += this.camera.baseY;
        this.renderMap(ctx, shiftX, shiftY);
        this.renderEntity(ctx, shiftX, shiftY);
    }
}

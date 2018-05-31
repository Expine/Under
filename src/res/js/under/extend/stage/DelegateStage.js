/**
 * Delegate stage
 * - Store stage size
 * - Performs updating and rendering stage
 * - Manages stage element such as entity
 * - ### Delegates other stage
 * @interface
 * @extends {Stage}
 * @classdesc Delegate stage to delegate other stage
 */
class DelegateStage extends Stage { // eslint-disable-line  no-unused-vars
    /**
     * Delegate stage constructor
     * @constructor
     * @param {Stage} baseStage Base stage for delegation
     */
    constructor(baseStage) {
        super(baseStage.name, baseStage.stageWidth, baseStage.stageHeight);

        /**
         * Base stage for delegation
         * @protected
         * @type {Stage}         *
         */
        this.baseStage = baseStage;
    }

    /**
     * Get base stage
     * @return {Stage} Base stage
     */
    getBaseStage() {
        return this.baseStage;
    }

    /**
     * Set background manager
     * @override
     * @param {Background} back Background manager
     */
    setBackground(back) {
        this.baseStage.setBackground(back);
    }

    /**
     * Set camera
     * @override
     * @param {Camera} camera Camera
     */
    setCamera(camera) {
        this.baseStage.setCamera(camera);
    }

    /**
     * Set physical world
     * @override
     * @param {PhysicalWorld} physic Physical world
     */
    setPhysicalWorld(physic) {
        this.baseStage.setPhysicalWorld(physic);
    }

    /**
     * Set entity factory
     * @override
     * @param {EntityFactory} factory Entity factory
     */
    setFactory(factory) {
        this.baseStage.setFactory(factory);
    }

    /**
     * Get physical world
     * @override
     * @return {PhysicalWorld} Physical world
     */
    getPhysicalWorld() {
        return this.baseStage.getPhysicalWorld();
    }

    /**
     * Get camera
     * @override
     * @return {Camera} Camera of stage
     */
    getCamera() {
        return this.baseStage.getCamera();
    }

    /**
     * Get factory
     * @protected
     * @override
     * @return {EntityFactory} Entity factory
     */
    getFactory() {
        return this.baseStage.getFactory();
    }

    /**
     * Set whether to update the stage or not
     * @override
     * @param {boolean} enable Whether to update the stage or not
     */
    setEnable(enable) {
        this.baseStage.setEnable(enable);
    }

    /**
     * Get whether to update the stage or not
     * @override
     * @return {boolean} Whether to update the stage or not
     */
    getEnable() {
        return this.baseStage.getEnable();
    }

    /**
     * Get stage width
     * @override
     * @return {number} Stage width
     */
    getStageWidth() {
        return this.baseStage.getStageWidth();
    }

    /**
     * Get stage height
     * @override
     * @return {number} Stage height
     */
    getStageHeight() {
        return this.baseStage.getStageHeight();
    }

    /**
     * Add entity to stage
     * @override
     * @param {Entity} entity Entity object
     */
    addEntity(entity) {
        this.baseStage.addEntity(entity);
    }

    /**
     * Remove entity from stage
     * @override
     * @param {Entity} entity Entity object
     */
    removeEntity(entity) {
        this.baseStage.removeEntity(entity);
    }

    /**
     * Remove entity from stage immediately
     * @override
     * @protected
     * @param {Entity} entity Entity object
     */
    removeEntityImmediately(entity) {
        this.baseStage.removeEntityImmediately(entity);
    }

    /**
     * Get all entities
     * @override
     * @return {Array<Entity>} All entities
     */
    getEntities() {
        return this.baseStage.getEntities();
    }

    /**
     * Get all entities by interface
     * @override
     * @param {Class} inter Interface for judging
     * @param {boolean} useInstanceOf Whether uses insntaceof or not
     * @return {Array<Entity>} All entities attached that interface
     */
    getEntitiesByInterface(inter, useInstanceOf = false) {
        return this.baseStage.getEntitiesByInterface(inter, useInstanceOf);
    }

    /**
     * Update entity in stage
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateEntity(dt) {
        this.baseStage.updateEntity(dt);
    }

    /**
     * Update entity in stage by physical world
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updatePhysics(dt) {
        this.baseStage.updatePhysics(dt);
    }

    /**
     * Update background
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateBackground(dt) {
        this.baseStage.updateBackground(dt);
    }

    /**
     * Update camera
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateCamera(dt) {
        this.baseStage.updateCamera(dt);
    }

    /**
     * Initialize stage
     * @override
     */
    init() {
        this.baseStage.init();
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
        this.baseStage.renderBackground(ctx, shiftX, shiftY);
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
        this.baseStage.renderEntity(ctx, shiftX, shiftY);
    }

    /**
     * Render world in stage
     * @override
     * @protected
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     */
    renderWorld(ctx, shiftX, shiftY) {
        this.baseStage.renderWorld(ctx, shiftX, shiftY);
    }
}

/**
 * Stage
 * - Store stage size
 * - Performs updating and rendering stage
 * - Manages stage element such as entity
 * @abstract
 * @classdesc Stage to control stage element
 */
export abstract class Stage {
    /**
     * Stage name
     * @protected
     * @type {string}
     */
    name: string;
    /**
     * Stage width (pixel)
     * @protected
     * @type {number}
     */
    stageWidth: number;
    /**
     * Stage height (pixel)
     * @protected
     * @type {number}
     */
    stageHeight: number;

    /**
     * Whether to update the stage or not
     * @protected
     * @type {boolean}
     */
    enable: boolean;

    /**
     * Stage background element
     * @protected
     * @type {Background}
     */
    back: Background;
    /**
     * Stage camera element
     * @protected
     * @type {Camera}
     */
    camera: Camera;
    /**
     * Physical world
     * @protected
     * @type {PhysicalWorld}
     */
    physic: PhysicalWorld;

    /**
     * Entity factory
     * @protected
     * @type {EntityFactory}
     */
    factory: EntityFactory;

    /**
     * Stage constructor
     * @constructor
     * @param {string} name Stage name
     * @param {number} stageWidth Stage width (pixel)
     * @param {number} stageHeight Stage height (pixel)
     */
    constructor(name: string, stageWidth: number, stageHeight: number) {
        this.name = name;
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        this.enable = true;

        this.back = null;
        this.camera = null;
        this.physic = null;
        this.factory = null;
    }

    /**
     * Set background manager
     * @param {Background} back Background manager
     */
    setBackground(back: Background) {
        this.back = back;
        this.back.init();
    }

    /**
     * Set camera
     * @param {Camera} camera Camera
     */
    setCamera(camera: Camera) {
        this.camera = camera;
    }

    /**
     * Set physical world
     * @param {PhysicalWorld} physic Physical world
     */
    setPhysicalWorld(physic: PhysicalWorld) {
        this.physic = physic;
    }

    /**
     * Set entity factory
     * @param {EntityFactory} factory Entity factory
     */
    setFactory(factory: EntityFactory) {
        this.factory = factory;
    }

    /**
     * Get physical world
     * @return {PhysicalWorld} Physical world
     */
    getPhysicalWorld(): PhysicalWorld {
        return this.physic;
    }

    /**
     * Get camera
     * @return {Camera} Camera of stage
     */
    getCamera(): Camera {
        return this.camera;
    }

    /**
     * Get factory
     * @protected
     * @return {EntityFactory} Entity factory
     */
    getFactory(): EntityFactory {
        return this.factory;
    }

    /**
     * Set whether to update the stage or not
     * @param {boolean} enable Whether to update the stage or not
     */
    setEnable(enable: boolean) {
        this.enable = enable;
    }

    /**
     * Get whether to update the stage or not
     * @return {boolean} Whether to update the stage or not
     */
    getEnable(): boolean {
        return this.enable;
    }

    /**
     * Get stage width
     * @return {number} Stage width
     */
    getStageWidth(): number {
        return this.stageWidth;
    }

    /**
     * Get stage height
     * @return {number} Stage height
     */
    getStageHeight(): number {
        return this.stageHeight;
    }

    /**
     * Add entity to stage by ID
     * @param {Object} id Added entity ID
     * @param {JSON} deploy Deploy json data
     * @return {Entity} Added entity
     */
    addEntityByID(id: object, deploy: JSON): Entity {
        const ret = this.getFactory().createEntity(id, deploy);
        this.addEntity(ret);
        return ret;
    }

    /**
     * Add entity to stage
     * @param {Entity} entity Entity object
     */
    addEntity(entity: Entity) {
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
    removeEntity(entity: Entity) { }

    /**
     * Remove entity from stage immediately
     * @abstract
     * @protected
     * @param {Entity} entity Entity object
     */
    removeEntityImmediately(entity: Entity) { }

    /**
     * Get all entities
     * @abstract
     * @return {Array<Entity>} All entities
     */
    getEntities(): Array<Entity> { }

    /**
     * Get all entities by interface
     * @abstract
     * @param {Class} inter Interface for judging
     * @return {Array<Entity>} All entities attached that interface
     */
    getEntitiesByInterface(inter: Class): Array<Entity> { }

    /**
     * Update entity in stage
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    updateEntity(dt: number) { }

    /**
     * Update entity in stage by physical world
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    updatePhysics(dt: number) { }

    /**
     * Update background
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    updateBackground(dt: number) { }

    /**
     * Update camera
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    updateCamera(dt: number) { }

    /**
     * Initialize stage
     * @abstract
     */
    init() { }

    /**
     * Update stage
     * @param {number} dt Delta time
     */
    update(dt: number) {
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
    renderBackground(ctx: Context, shiftX: number, shiftY: number) { }

    /**
     * Render entities in stage
     * @abstract
     * @protected
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     */
    renderEntity(ctx: Context, shiftX: number, shiftY: number) { }

    /**
     * Render world in stage
     * @abstract
     * @protected
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     */
    renderWorld(ctx: Context, shiftX: number, shiftY: number) { }

    /**
     * Render stage
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx: Context, shiftX: number = 0, shiftY: number = 0) {
        shiftX += this.getCamera().baseX;
        shiftY += this.getCamera().baseY;
        this.renderBackground(ctx, shiftX, shiftY);
        this.renderEntity(ctx, shiftX, shiftY);
        this.renderWorld(ctx, shiftX, shiftY);
    }
}

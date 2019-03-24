import { Background } from "./back/Background";
import { Camera } from "./camera/Camera";
import { PhysicalWorld } from "./physics/PhysicalWorld";
import { EntityFactory, EntityID } from "./parser/EntityFactory";
import { Entity } from "./entity/Entity";
import { Context } from "../resources/image/Context";

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
     * @type {string}
     */
    name: string;
    /**
     * Stage width (pixel)
     * @type {number}
     */
    stageWidth: number;
    /**
     * Stage height (pixel)
     * @type {number}
     */
    stageHeight: number;

    /**
     * Whether to update the stage or not
     * @protected
     * @type {boolean}
     */
    protected enable: boolean;

    /**
     * Stage background element
     * @protected
     * @type {Background}
     */
    protected back: Background | null;
    /**
     * Stage camera element
     * @protected
     * @type {Camera}
     */
    protected camera: Camera | null;
    /**
     * Physical world
     * @protected
     * @type {PhysicalWorld}
     */
    protected physic: PhysicalWorld | null;

    /**
     * Entity factory
     * @protected
     * @type {EntityFactory}
     */
    protected factory: EntityFactory | null;

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
    getPhysicalWorld(): PhysicalWorld | null {
        return this.physic;
    }

    /**
     * Get camera
     * @return {Camera} Camera of stage
     */
    getCamera(): Camera | null {
        return this.camera;
    }

    /**
     * Get factory
     * @protected
     * @return {EntityFactory} Entity factory
     */
    getFactory(): EntityFactory | null {
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
     * @param {EntityID} id Added entity ID
     * @param {any} deploy Deploy json data
     * @return {Entity} Added entity
     */
    addEntityByID(id: EntityID, deploy: any): Entity | null {
        const factory = this.getFactory();
        if (factory === null) {
            return null;
        }
        const ret = factory.createEntity(id, deploy);
        if (ret !== null) {
            this.addEntity(ret);
        }
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
    abstract removeEntity(entity: Entity): void;

    /**
     * Remove entity from stage immediately
     * @abstract
     * @protected
     * @param {Entity} entity Entity object
     */
    abstract removeEntityImmediately(entity: Entity): void;

    /**
     * Get all entities
     * @abstract
     * @return {Array<Entity>} All entities
     */
    abstract getEntities(): Array<Entity>;

    /**
     * Get all entities by interface
     * @abstract
     * @param {(arg: any) => arg is T} inter Interface for judging
     * @return {Array<Entity>} All entities attached that interface
     */
    abstract getEntitiesByInterface<T>(inter: (arg: any) => arg is T): Array<Entity & T>;

    /**
     * Update entity in stage
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    abstract updateEntity(dt: number): void;

    /**
     * Update entity in stage by physical world
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    abstract updatePhysics(dt: number): void;

    /**
     * Update background
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    abstract updateBackground(dt: number): void;

    /**
     * Update camera
     * @abstract
     * @protected
     * @param {number} dt Delta time
     */
    abstract updateCamera(dt: number): void;

    /**
     * Initialize stage
     * @abstract
     */
    abstract init(): void;

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
    abstract renderBackground(ctx: Context, shiftX: number, shiftY: number): void;

    /**
     * Render entities in stage
     * @abstract
     * @protected
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     */
    abstract renderEntity(ctx: Context, shiftX: number, shiftY: number): void;

    /**
     * Render world in stage
     * @abstract
     * @protected
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     */
    abstract renderWorld(ctx: Context, shiftX: number, shiftY: number): void;

    /**
     * Render stage
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx: Context, shiftX: number = 0, shiftY: number = 0) {
        const camera = this.getCamera();
        if (camera !== null) {
            shiftX += camera.baseX;
            shiftY += camera.baseY;
        }
        this.renderBackground(ctx, shiftX, shiftY);
        this.renderEntity(ctx, shiftX, shiftY);
        this.renderWorld(ctx, shiftX, shiftY);
    }
}

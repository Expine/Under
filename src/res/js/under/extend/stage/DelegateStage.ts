import { Stage } from "../../base/stage/Stage";
import { Background } from "../../base/stage/back/Background";
import { Camera } from "../../base/stage/camera/Camera";
import { PhysicalWorld } from "../../base/stage/physics/PhysicalWorld";
import { EntityFactory } from "../../base/stage/parser/EntityFactory";
import { Entity } from "../../base/stage/entity/Entity";
import { Context } from "../../base/resources/image/Context";

/**
 * Delegate stage
 * - Delegates other stage
 * @interface
 * @extends {Stage}
 * @classdesc Delegate stage to delegate other stage
 */
export class DelegateStage extends Stage {
    /**
     * Base stage for delegation
     * @protected
     * @type {Stage}         *
     */
    protected baseStage: Stage;

    /**
     * Delegate stage constructor
     * @constructor
     * @param {Stage} baseStage Base stage for delegation
     */
    constructor(baseStage: Stage) {
        super(baseStage.name, baseStage.stageWidth, baseStage.stageHeight);

        this.baseStage = baseStage;
    }

    /**
     * Get base stage
     * @return {Stage} Base stage
     */
    getBaseStage(): Stage {
        return this.baseStage;
    }

    /**
     * Set background manager
     * @override
     * @param {Background} back Background manager
     */
    setBackground(back: Background) {
        this.baseStage.setBackground(back);
    }

    /**
     * Set camera
     * @override
     * @param {Camera} camera Camera
     */
    setCamera(camera: Camera) {
        this.baseStage.setCamera(camera);
    }

    /**
     * Set physical world
     * @override
     * @param {PhysicalWorld} physic Physical world
     */
    setPhysicalWorld(physic: PhysicalWorld) {
        this.baseStage.setPhysicalWorld(physic);
    }

    /**
     * Set entity factory
     * @override
     * @param {EntityFactory} factory Entity factory
     */
    setFactory(factory: EntityFactory) {
        this.baseStage.setFactory(factory);
    }

    /**
     * Get physical world
     * @override
     * @return {PhysicalWorld} Physical world
     */
    getPhysicalWorld(): PhysicalWorld | null {
        return this.baseStage.getPhysicalWorld();
    }

    /**
     * Get camera
     * @override
     * @return {Camera} Camera of stage
     */
    getCamera(): Camera | null {
        return this.baseStage.getCamera();
    }

    /**
     * Get factory
     * @protected
     * @override
     * @return {EntityFactory} Entity factory
     */
    getFactory(): EntityFactory | null {
        return this.baseStage.getFactory();
    }

    /**
     * Set whether to update the stage or not
     * @override
     * @param {boolean} enable Whether to update the stage or not
     */
    setEnable(enable: boolean) {
        this.baseStage.setEnable(enable);
    }

    /**
     * Get whether to update the stage or not
     * @override
     * @return {boolean} Whether to update the stage or not
     */
    getEnable(): boolean {
        return this.baseStage.getEnable();
    }

    /**
     * Get stage width
     * @override
     * @return {number} Stage width
     */
    getStageWidth(): number {
        return this.baseStage.getStageWidth();
    }

    /**
     * Get stage height
     * @override
     * @return {number} Stage height
     */
    getStageHeight(): number {
        return this.baseStage.getStageHeight();
    }

    /**
     * Add entity to stage
     * @override
     * @param {Entity} entity Entity object
     */
    addEntity(entity: Entity) {
        this.baseStage.addEntity(entity);
    }

    /**
     * Remove entity from stage
     * @override
     * @param {Entity} entity Entity object
     */
    removeEntity(entity: Entity) {
        this.baseStage.removeEntity(entity);
    }

    /**
     * Remove entity from stage immediately
     * @override
     * @protected
     * @param {Entity} entity Entity object
     */
    removeEntityImmediately(entity: Entity) {
        this.baseStage.removeEntityImmediately(entity);
    }

    /**
     * Get all entities
     * @override
     * @return {Array<Entity>} All entities
     */
    getEntities(): Array<Entity> {
        return this.baseStage.getEntities();
    }

    /**
     * Get all entities by interface
     * @override
     * @param {Class} inter Interface for judging
     * @return {Array<Entity>} All entities attached that interface
     */
    getEntitiesByInterface<T>(inter: (arg: any) => arg is T): Array<Entity & T> {
        return this.baseStage.getEntitiesByInterface(inter);
    }

    /**
     * Update entity in stage
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateEntity(dt: number) {
        this.baseStage.updateEntity(dt);
    }

    /**
     * Update entity in stage by physical world
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updatePhysics(dt: number) {
        this.baseStage.updatePhysics(dt);
    }

    /**
     * Update background
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateBackground(dt: number) {
        this.baseStage.updateBackground(dt);
    }

    /**
     * Update camera
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateCamera(dt: number) {
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
    renderBackground(ctx: Context, shiftX: number, shiftY: number) {
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
    renderEntity(ctx: Context, shiftX: number, shiftY: number) {
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
    renderWorld(ctx: Context, shiftX: number, shiftY: number) {
        this.baseStage.renderWorld(ctx, shiftX, shiftY);
    }
}

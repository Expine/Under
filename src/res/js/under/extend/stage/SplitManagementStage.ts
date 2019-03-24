import { Stage } from "../../base/stage/Stage";
import { Entity } from "../../base/stage/entity/Entity";
import { isIPlayable, IPlayable } from "../../base/stage/entity/interface/IPlayable";
import { InfluentialEntity } from "../../base/stage/entity/InfluentialEntity";
import { Context } from "../../base/resources/image/Context";

/**
 * Split management stage
 * - Dividingly manages entities according to type
 * - Do not update immutable objects
 * @extends {Stage}
 * @classdesc Split management stage to manage entities according to type dividingly
 */
export class SplitManagementStage extends Stage {
    /**
     * All entity list
     * @protected
     * @type {Array<Entity>}
     */
    protected entities: Array<Entity>;
    /**
     * Sorted entity for rendering
     * @protected
     * @type {Array<Entity>}
     */
    protected sortedEntity: Array<Entity>;
    /**
     * Intefcae list
     * @protected
     * @type {Object<string, Class>}
     */
    protected interfaceList: { [s: string]: any; };
    /**
     * Entity list of each interface
     * @protected
     * @type {Object<string, Array<Entity>>}
     */
    protected interfacedEntityList: { [s: string]: Array<Entity>; };

    /**
     * List of entity that will be removed
     * @protected
     * @type {Array<Entity>}
     */
    protected removeList: Array<Entity>;

    /**
     * Playable instance for camera
     * @protected
     * @type {IPlayable}
     */
    protected player: IPlayable | null;

    /**
     * Whehter initialize is ended or not
     * @protected
     * @type {boolean}
     */
    protected inited: boolean;

    /**
     * Split management stage constructor
     * @constructor
     * @param {string} name Stage name
     * @param {number} stageWidth Stage width (pixel)
     * @param {number} stageHeight Stage height (pixel)
     */
    constructor(name: string, stageWidth: number, stageHeight: number) {
        super(name, stageWidth, stageHeight);
        this.entities = [];
        this.sortedEntity = [];
        this.interfaceList = {};
        this.interfacedEntityList = {};
        this.removeList = [];
        this.player = null;
        this.inited = false;
    }

    /**
     * Initialize stage
     * @override
     */
    init() {
        this.inited = true;
        this.sortedEntity = Object.assign([], this.entities).sort((a: Entity, b: Entity) => {
            return a.z < b.z ? -1 : a.z > b.z ? 1 : 0;
        });

        if (this.player !== null && this.camera !== null) {
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
    addEntity(entity: Entity) {
        // set player
        if (isIPlayable(entity)) {
            this.player = entity;
        }
        if (entity instanceof InfluentialEntity && this.physic !== null) {
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
                if (this.interfaceList[name](entity)) {
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
    removeEntity(entity: Entity) {
        this.removeList.push(entity);
    }

    /**
     * Remove entity from stage immediately
     * @abstract
     * @protected
     * @param {Entity} entity Entity object
     */
    removeEntityImmediately(entity: Entity) {
        // remove player
        if (isIPlayable(entity) && entity === this.player) {
            this.player = null;
        }
        if (entity instanceof InfluentialEntity && this.physic !== null) {
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
        for (const name in this.interfacedEntityList) {
            if (this.interfacedEntityList.hasOwnProperty(name)) {
                if (this.interfaceList[name](entity)) {
                    // remove interface
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
    getEntities(): Array<Entity> {
        return this.entities;
    }

    /**
     * Get all entities by interface
     * @override
     * @param {Class} inter Interface for judging
     * @return {Array<Entity>} All entities attached that interface
     */
    getEntitiesByInterface<T>(inter: (arg: any) => arg is T): Array<Entity & T> {
        // check already
        const name = inter.toString();
        if (this.interfacedEntityList[name] === undefined) {
            this.interfacedEntityList[name] = this.entities.filter((it) => inter(it));
            this.interfaceList[name] = inter;
        }
        return this.interfacedEntityList[name] as Array<Entity & T>;
    }

    /**
     * Update entity in stage
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateEntity(dt: number) {
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
    updatePhysics(dt: number) {
        if (this.physic !== null) {
            this.physic.update(dt);
        }
    }

    /**
     * Update background
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateBackground(dt: number) {
        if (this.back !== null) {
            this.back.update(dt);
        }
    }

    /**
     * Update camera
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateCamera(dt: number) {
        if (this.player !== null && this.camera !== null) {
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
    renderBackground(ctx: Context, shiftX: number, shiftY: number) {
        if (this.back !== null && this.camera !== null) {
            this.back.render(ctx, shiftX + this.camera.cameraX, shiftY + this.camera.cameraY, this.camera.screenWidth, this.camera.screenHeight);
        }
    }

    /**
     * Render entities in stage
     * @override
     * @protected
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     */
    renderEntity(ctx: Context, _shiftX: number, _shiftY: number) {
        if (this.camera !== null) {
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
    }

    /**
     * Render world in stage
     * @abstract
     * @protected
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     */
    renderWorld(ctx: Context, shiftX: number, shiftY: number) {
        if (this.physic !== null) {
            this.physic.render(ctx, shiftX, shiftY);
        }
    }
}

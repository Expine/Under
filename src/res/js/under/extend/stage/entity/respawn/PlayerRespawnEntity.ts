import { RespawnEntity } from "./RespawnEntity";
import { IColliderable } from "../../../../base/stage/entity/interface/IColliderable";
import { Collider } from "../../../../base/stage/physics/collider/Collider";
import { Entity } from "../../../../base/stage/entity/Entity";
import { isIPlayable } from "../../../../base/stage/entity/interface/IPlayable";
import { Context } from "../../../../base/resources/image/Context";

/**
 * Player respawn entity
 * - Generates player
 * @extends {RespawnEntity}
 * @implements {IColliderable}
 * @classdesc Player respawn entity to generate player
 */
export class PlayerRespawnEntity extends RespawnEntity implements IColliderable {
    /**
     * Player ID
     * @protected
     * @type {number}
     */
    protected playerID: number;
    /**
     * Priority of respawning player
     * @protected
     * @type {number}
     */
    protected priority: number;

    /**
     * Collider for registering
     * @protected
     * @type {Collider}
     */
    protected collider: Collider | null;

    /**
     * Registered respawn point
     * @protected
     * @type {boolean}
     */
    protected registered: boolean;

    /**
     * Player respawn Entity
     * @constructor
     * @param {number} playerID Player ID
     * @param {number} priority Priority of respawning player
     */
    constructor(playerID: number, priority: number) {
        super();

        this.playerID = playerID;
        this.priority = priority;
        this.collider = null;
        this.registered = false;
    }

    /**
     * Set collider
     * @param {Collider} collider collider
     */
    setCollider(collider: Collider) {
        this.collider = collider;
        this.collider.setEntity(this);
        this.collider.init();
    }

    /**
     * Get collider
     * @override
     * @return {Collider} Collider that object has
     */
    getCollider(): Collider | null {
        return this.collider;
    }

    /**
     * Generates entity and add to stage
     * @override
     * @protected
     * @return {Entity} Generated entity
     */
    createRespawnEntity(): Entity | null {
        return this.stage === null ? null : this.stage.addEntityByID(this.playerID, {
            x: this.x,
            y: this.y,
            z: this.z,
            collider: {
                id: this.stage.getEntitiesByInterface(isIPlayable).length,
            },
        });
    }

    /**
     * Try to respawn entity
     * @override
     * @param {number} dt Delta time
     * @return {Entity} Generated entity
     */
    tryRespawn(dt: number): Entity | null {
        // check registered
        if (!this.registered || this.stage === null) {
            return null;
        }
        // check other
        for (const other of this.stage.getEntitiesByInterface(isPlayerRespawnEntity)) {
            if (other.registered && other.priority > this.priority) {
                return null;
            }
        }
        return super.tryRespawn(dt);
    }

    /**
     * Initialize entity
     * @override
     */
    init() {
        if (this.collider !== null) {
            this.collider.init();
        }
    }

    /**
     * Update entty
     * @override
     * @param {number} dt Delta time
     */
    update(_dt: number) {
        // check registered
        if (this.registered || this.stage === null || this.collider === null) {
            return;
        }
        const physic = this.stage.getPhysicalWorld();
        if (physic !== null) {
            // judge to register
            for (const it of physic.getCollisionData(this.collider)) {
                if (isIPlayable(it.colliding)) {
                    this.registered = true;
                    break;
                }
            }
        }
    }

    /**
     * Render entity
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     */
    render(_ctx: Context, _shiftX: number, _shiftY: number) { };
}

/**
 * Type guard for PlayerRespawnEntity
 */
export const isPlayerRespawnEntity = (arg: any): arg is PlayerRespawnEntity => arg !== null && arg instanceof PlayerRespawnEntity;

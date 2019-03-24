import { Entity } from "../../../../base/stage/entity/Entity";
import { IEventEntity } from "../../../../base/stage/entity/interface/IEventEntity";
import { IColliderable } from "../../../../base/stage/entity/interface/IColliderable";
import { GameEvent } from "../../../../base/event/common/GameEvent";
import { Collider } from "../../../../base/stage/physics/collider/Collider";
import { isIStageEvent } from "../../../../base/event/onstage/IStageEvent";
import { EventManager } from "../../../../base/event/EventManager";
import { Util } from "../../../util/Util";
import { isIPlayable } from "../../../../base/stage/entity/interface/IPlayable";
import { Context } from "../../../../base/resources/image/Context";
import { InfluentialEntity } from "../../../../base/stage/entity/InfluentialEntity";

/**
 * Immutable event object
 * - Fire event
 * @extends {Entity}
 * @implements {IEventEntity}
 * @implements {IColliderable}
 * @classdesc Immutable event object to fire event
 */
export class ImmutableEvent extends Entity implements IEventEntity, IColliderable {
    /**
     * Event for firing
     * @protected
     * @type {GameEvent}
     */
    protected event: GameEvent | null;

    /**
     * Whether it has already collided
     * @@protected
     * @type {boolean}
     */
    protected collided: boolean;

    /**
     * Event collider for firing
     * @protected
     * @type {Collider}
     */
    protected eventCollider: Collider | null;

    /**
     * Immutable event object constructor
     * @constructor
     */
    constructor() {
        super();

        this.event = null;
        this.collided = false;
        this.eventCollider = null;
    }

    /**
     * Set game event
     * @override
     * @param {GameEvent} event Stage event
     */
    setEvent(event: GameEvent) {
        this.event = event;
    }

    /**
     * Get stage event
     * @override
     * @return {GameEvent} Stage event
     */
    getEvent(): GameEvent | null {
        return this.event;
    }

    /**
     * Fires event
     * @override
     */
    fire() {
        if (this.stage !== null && isIStageEvent(this.event)) {
            this.event.setStage(this.stage);
        }
        if (this.event !== null) {
            EventManager.it.register(this.event);
        }
    }

    /**
     * Set collider
     * @param {Collider} collider collider
     */
    setCollider(collider: Collider) {
        this.eventCollider = collider;
        this.eventCollider.setEntity(this);
        this.eventCollider.init();
    }

    /**
     * Get collider
     * @override
     * @return {Collider} Collider that object has
     */
    getCollider(): Collider | null {
        return this.eventCollider;
    }

    /**
     * Initialize entity
     * @override
     */
    init() {
        if (this.eventCollider !== null) {
            this.eventCollider.update();
        }
    }

    /**
     * Update entty
     * @override
     * @param {number} dt Delta time
     */
    update(_dt: number) {
        let localCollided = false;
        if (this.stage !== null && this.eventCollider !== null) {
            const physic = this.stage.getPhysicalWorld();
            if (physic !== null) {
                for (const it of physic.getCollisionData(this.eventCollider)) {
                    const you = Util.getCollidedEntity(<unknown>this as InfluentialEntity, it);
                    if (isIPlayable(you)) {
                        localCollided = true;
                        if (!this.collided) {
                            this.fire();
                            break;
                        }
                    }
                }
                this.collided = localCollided;
            }
        }
    }

    /**
     * Render entity
     * @abstract
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     */
    render(_ctx: Context, _shiftX: number, _shiftY: number) { }
}

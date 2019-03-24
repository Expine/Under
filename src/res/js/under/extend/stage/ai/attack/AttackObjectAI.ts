import { AI } from "../../../../base/stage/ai/AI";
import { Entity } from "../../../../base/stage/entity/Entity";
import { isIOwned } from "../../../../base/stage/entity/interface/IOwned";
import { Util } from "../../../util/Util";
import { isIDamagable } from "../../../../base/stage/entity/interface/IDamagable";

/**
 * Attack object AI
 * - AI that is attached to attack object
 * @extends {AI}
 * @classdesc Attack object AI that is attached to attack object
 */
export class AttackObjectAI extends AI {
    /**
     * Owned entity
     * @protected
     * @type {Entity}
     */
    protected actor: Entity | null;

    /**
     * Previous actor x position
     * @protected
     * @type {number}
     */
    protected preActorX: number;
    /**
     * Previous actor y position
     * @protected
     * @type {number}
     */
    protected preActorY: number;

    /**
     * Attack object AI Constructor
     * @constructor
     */
    constructor() {
        super();

        this.actor = null;
        this.preActorX = 0;
        this.preActorY = 0;
    }

    /**
     * Initialize
     * @override
     */
    init() {
        if (this.entity !== null && isIOwned(this.entity)) {
            this.actor = this.entity.getOwner();
            if (this.actor !== null) {
                this.preActorX = this.actor.x;
                this.preActorY = this.actor.y;
            }
        }
    }

    /**
     * Update AI
     * @override
     * @param {number} dt Delta time
     */
    update(_dt: number) { }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(_dt: number): boolean {
        // move to actor
        if (this.entity !== null && this.actor !== null) {
            this.entity.deltaMove(this.actor.x - this.preActorX, this.actor.y - this.preActorY);
            this.preActorX = this.actor.x;
            this.preActorY = this.actor.y;
        }

        // If damageable object is collided, damage
        if (this.entity !== null && this.entity.collider !== null) {
            for (const it of this.entity.collider.collisions) {
                const entity = Util.getCollidedEntity(this.entity, it);
                if (this.actor !== entity && isIDamagable(entity)) {
                    entity.damage(1);
                }
            }
        }
        return true;
    }
}

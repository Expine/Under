import { AI } from "../../../../base/stage/ai/AI";
import { Entity } from "../../../../base/stage/entity/Entity";
import { isIOwned } from "../../../../base/stage/entity/interface/IOwned";
import { Util } from "../../../util/Util";
import { isIDamagable } from "../../../../base/stage/entity/interface/IDamagable";
import { isIBreakable } from "../../../../base/stage/entity/interface/IBreakable";

/**
 * Straight attack AI
 * - AI that moves straightly for attacking
 * @extends {AI}
 * @classdesc Straight attack AI that moves straightly for attacking
 */
export class StraightAttackAI extends AI {
    /**
     * Maximum speed x vector
     * @protected
     * @type {number}
     */
    protected maxVelocityX: number;
    /**
     * Maximum speed y vector
     * @protected
     * @type {number}
     */
    protected maxVelocityY: number;

    /**
     * Force of x direction applied when moving
     * @protected
     * @type {number}
     */
    protected movePowerX: number;
    /**
     * Force of x direction applied when moving
     * @protected
     * @type {number}
     */
    protected movePowerY: number;

    /**
     * Owned entity
     * @protected
     * @type {Entity}
     */
    protected actor: Entity | null;

    /**
     * Straight attack AI Constructor
     * @constructor
     * @param {number} maxVelocityX Maximum speed x vector
     * @param {number} maxVelocityY Maximum speed y vector
     * @param {number} movePowerX Force of x direction applied when moving
     * @param {number} movePowerY Force of y direction applied when moving
     */
    constructor(maxVelocityX: number, maxVelocityY: number, movePowerX: number, movePowerY: number) {
        super();

        this.maxVelocityX = maxVelocityX;
        this.maxVelocityY = maxVelocityY;
        this.movePowerX = movePowerX;
        this.movePowerY = movePowerY;
        this.actor = null;
    }

    /**
     * Initialize
     * @override
     */
    init() {
        if (this.entity !== null && isIOwned(this.entity)) {
            this.actor = this.entity.getOwner();
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
    apply(dt: number): boolean {
        // move to actor
        if (this.entity !== null) {
            if (this.entity.body !== null && this.entity.material !== null) {
                if (this.entity.body.velocityX * this.entity.directionX < 0 || Math.abs(this.entity.body.velocityX) < Math.abs(this.maxVelocityX)) {
                    this.entity.body.enforce(this.movePowerX * this.entity.material.mass * this.entity.directionX / dt, 0);
                }
                if (this.entity.body.velocityY * this.entity.directionY < 0 || Math.abs(this.entity.body.velocityY) < Math.abs(this.maxVelocityY)) {
                    this.entity.body.enforce(0, this.movePowerY * this.entity.material.mass * this.entity.directionY / dt);
                }
            }

            // If damageable object is collided, damage
            if (this.entity.collider !== null) {
                const collisions = this.entity.collider.collisions;
                for (const it of collisions) {
                    const entity = Util.getCollidedEntity(this.entity, it);
                    if (this.actor === entity) {
                        continue;
                    }
                    if (isIDamagable(entity)) {
                        entity.damage(1);
                    }
                    // destroy if it is collided
                    if (isIBreakable(this.entity)) {
                        this.entity.destroy();
                    }
                }
            }
        }
        return true;
    }
}

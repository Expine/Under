/**
 * Straight attack AI
 * - Determines the behavior of an entity
 * - ### AI that moves straightly for attacking
 * @extends {AI}
 * @classdesc Straight attack AI that moves straightly for attacking
 */
class StraightAttackAI extends AI {
    /**
     * Straight attack AI Constructor
     * @constructor
     * @param {number} maxVeocityX Maximum speed x vector
     * @param {number} maxVeocityY Maximum speed y vector
     * @param {number} movePowerX Force of x direction applied when moving
     * @param {number} movePowerY Force of y direction applied when moving
     */
    constructor(maxVelocityX, maxVelocityY, movePowerX, movePowerY) {
        super();

        /**
         * Maximum speed x vector
         * @protected
         * @type {number}
         */
        this.maxVelocityX = maxVelocityX;
        /**
         * Maximum speed y vector
         * @protected
         * @type {number}
         */
        this.maxVelocityY = maxVelocityY;

        /**
         * Force of x direction applied when moving
         * @protected
         * @type {number}
         */
        this.movePowerX = movePowerX;
        /**
         * Force of x direction applied when moving
         * @protected
         * @type {number}
         */
        this.movePowerY = movePowerY;

        /**
         * Owned entity
         * @protected
         * @type {Entity}
         */
        this.actor = null;
    }

    /**
     * Initialize
     * @override
     */
    init() {
        if (BaseUtil.implementsOf(this.entity, IOwned)) {
            this.actor = this.entity.getOwner();
        }
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        // move to actor
        if (this.entity.body.velocityX * this.entity.directionX < 0 || Math.abs(this.entity.body.velocityX) < Math.abs(this.maxVelocityX)) {
            this.entity.body.enforce(this.movePowerX * this.entity.material.mass * this.entity.directionX / dt, 0);
        }
        if (this.entity.body.velocityY * this.entity.directionY < 0 || Math.abs(this.entity.body.velocityY) < Math.abs(this.maxVelocityY)) {
            this.entity.body.enforce(0, this.movePowerY * this.entity.material.mass * this.entity.directionY / dt);
        }

        // If damageable object is collided, damage
        for (const it of this.entity.collider.collisions) {
            const entity = Util.getCollidedEntity(this.entity, it);
            if (this.actor === entity) {
                continue;
            }
            if (BaseUtil.implementsOf(entity, IDamagable)) {
                entity.damage(1);
            }
            // destroy if it is collided
            if (BaseUtil.implementsOf(this.entity, IBreakable)) {
                this.entity.destroy();
            }
        }
        return true;
    }
}

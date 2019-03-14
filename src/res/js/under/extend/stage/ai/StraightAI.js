/**
 * Straight AI
 * - Determines the behavior of an entity
 * - ### AI to go straight ahead and reverses direction if it hit something
 * @extends {AI}
 * @classdesc Straight AI to go straight ahead and reverses direction if it hit something
 */
class StraightAI extends AI {
    /**
     * Straight AI Constructor
     * @constructor
     * @param {number} mvx Maximum speed vector of x
     * @param {number} px Force applied when moving
     */
    constructor(mvx, px) {
        super();

        /**
         * Maximum speed vector of x
         * @protected
         * @type {number}
         */
        this.maxVelocityX = mvx;
        /**
         * Force applied when moving
         * @protected
         * @type {number}
         */
        this.walkPower = px;
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        // check on ground
        if (!Util.onGround(this.entity)) {
            return true;
        }
        if (Util.getSideEntity(this.entity)) {
            this.entity.setDirection(this.entity.directionX * -1);
        }
        if (Math.abs(this.entity.body.velocityX) < this.maxVelocityX) {
            this.entity.body.enforce(this.entity.directionX * this.walkPower * this.entity.material.mass, 0);
        }
        return true;
    }
}

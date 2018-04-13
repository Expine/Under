/**
 * Straight AI
 * AI to go straight ahead
 * Reverses direction if it hit something
 * @implements {AI}
 * @classdesc Straight AI to go straight ahead
 */
class StraightAI extends AI { // eslint-disable-line  no-unused-vars
    /**
     * Straight AI Constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Maximum speed vector
         * @protected
         * @type {number}
         */
        this.maxVelocityX = 100;
        /**
         * Force applied when moving
         * @protected
         * @type {number}
         */
        this.walkPower = 1000;
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        // check on ground
        if (!Util.onGround(this.entity)) {
            return true;
        }
        if (Util.getSideEntity(this.entity)) {
            this.entity.directionX *= -1;
        }
        if (Math.abs(this.entity.body.velocityX) < this.maxVelocityX) {
            this.entity.body.enforce(this.entity.directionX * this.walkPower * this.entity.material.mass, 0);
        }
        return true;
    }
}

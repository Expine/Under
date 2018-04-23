/**
 * Jump AI
 * - Determines the behavior of an entity
 * - ### Jumps
 * @implements {AI}
 * @classdesc Jump AI to jump
 */
class JumpAI extends AI { // eslint-disable-line  no-unused-vars
    /**
     * Jump AI Constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Jumping force
         * @protected
         * @type {number}
         */
        this.jumpPower = 360;
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        // judge
        if (Util.onGround(this.entity)) {
            // reset and jump
            this.entity.body.enforce(0, -this.jumpPower * this.entity.material.mass * 1000 / dt);
        }
        return true;
    }
}

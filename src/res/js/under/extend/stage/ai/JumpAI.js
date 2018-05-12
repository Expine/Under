/**
 * Jump AI
 * - Determines the behavior of an entity
 * - ### Jumps
 * @extends {AI}
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
        this.jumpPower = 500;

        /**
         * On ground counter
         * @protected
         * @type {number}
         */
        this.onGroundCount = 0;
    }

    /**
     * Update AI
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        if (Util.onGround(this.entity)) {
            this.onGroundCount += dt / 1000;
        } else {
            this.onGroundCount -= dt / 1000;
            if (this.onGroundCount < 0) {
                this.onGroundCount = 0;
            }
        }
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        // judge
        if (this.onGroundCount > 1) {
            // reset and jump
            this.entity.body.enforce(0, -this.jumpPower * this.entity.material.mass * 1000 / dt);
        }
        return true;
    }
}

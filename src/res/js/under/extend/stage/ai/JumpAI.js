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
     * @param {number} jumpPower Jumping power
     */
    constructor(jumpPower) {
        super();

        /**
         * Jumping force
         * @protected
         * @type {number}
         */
        this.jumpPower = jumpPower;

        /**
         * On ground counter
         * @protected
         * @type {number}
         */
        this.onGroundCount = 0;
        /**
         * Jumped conter
         * @protected
         * @type {number}
         */
        this.jumpedCount = 0;
    }

    /**
     * Update AI
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        if (Util.onGround(this.entity)) {
            this.entity.getImage().init();
            this.onGroundCount += dt / 1000;
            this.jumpedCount -= dt / 1000;
        } else {
            this.jumpedCount = 1;
            this.onGroundCount = 0;
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
        if (this.onGroundCount > 1 && this.jumpedCount <= 0) {
            // reset and jump
            this.entity.body.enforce(0, -this.jumpPower * this.entity.material.mass * 1000 / dt);
        }
        return true;
    }
}

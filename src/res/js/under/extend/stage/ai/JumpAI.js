/**
 * Jump AI
 * AI to jump
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
         * @private
         * @type {number}
         */
        this.jumpPower_ = 360;
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt - delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        // judge
        if (Util.onGround(this.entity)) {
            // reset and jump
            this.entity.body.enforce(0, -this.jumpPower_ * 1000 / dt);
        }
        return true;
    }
}

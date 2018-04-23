/**
 * Player jump state
 * - Determines the operation by AI according to the state and renders based on state
 * - Enable to set animation
 * - Base state for rendering state animation
 * - ### Prepares for jumping
 * @implements {BaseState}
 * @classdesc Player jump state to prepare for jumping
 */
class PJumpState extends BaseState { // eslint-disable-line  no-unused-vars
    /**
     * Player jump state constructor
     * @constructor
     * @param {number} jumpPower Jumping force
     */
    constructor(jumpPower) {
        super();

        /**
         * Count for judging on air
         * @protected
         * @type {number}
         */
        this.inAirCount = 0;

        /**
         * Jump button pressed time
         * @protected
         * @type {number}
         */
        this.jumpPressedTime = 0;
        /**
         * Jump time
         * @protected
         * @type {number}
         */
        this.jumpDeltaTime = 0;

        /**
         * Jumping force
         * @protected
         * @type {number}
         */
        this.jumpPower = jumpPower;

        /**
         * Reserved velocity of X
         * @protected
         * @type {number}
         */
        this.reservedVelocityX = 0;
    }

    /**
     * Initialize
     * @override
     */
    init() {
        super.init();
        this.inAirCount = 0;
        this.jumpPressedTime = 0;
        this.jumpDeltaTime = 0;
        this.reservedVelocityX = this.entity.body.velocityX;
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        // animation
        this.entity.body.setNextAddVelocity(-this.entity.body.velocityX / 11, 0);
        if (Input.it.isPressed(Input.key.up())) {
            this.jumpPressedTime += 1;
        }
        this.jumpDeltaTime += 1;

        // judge
        if (!Util.onGround(this.entity)) {
            if (++this.inAirCount > 5) {
                this.ai.changeState(`stationary`);
            }
        } else {
            this.inAirCount = 0;
        }
        if (this.stateAnimation.isEnded() && this.inAirCount == 0) {
            // reset and jump
            this.entity.body.setNextAddVelocity(this.reservedVelocityX * 0.8 - this.entity.body.velocityX, -this.entity.body.velocityY);
            this.entity.body.enforce(0, -this.jumpPower * this.entity.material.mass * 1000 / dt * (this.jumpPressedTime + this.jumpDeltaTime) / 2 / this.jumpDeltaTime);
            this.ai.changeState(`jumping`);
        }
        return true;
    }
}

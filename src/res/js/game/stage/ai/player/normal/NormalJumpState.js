/**
 * State of normal jump
 * @implements {UnderPlayerState}
 * @classdesc State of normal jump
 */
class NormalJumpState extends UnderPlayerState { // eslint-disable-line  no-unused-vars
    /**
     * Normal jump state constructor
     * @constructor
     * @param {number} jumpPower Jumping force
     */
    constructor(jumpPower) {
        super();

        /**
         * Count for judging on air
         * @private
         */
        this.inAirCount_ = 0;

        /**
         * Jump button pressed time
         * @private
         * @type {number}
         */
        this.jumpPressedTime_ = 0;
        /**
         * Jump time
         * @private
         * @type {number}
         */
        this.jumpDeltaTime_ = 0;

        /**
         * Jumping force
         * @private
         * @type {number}
         */
        this.jumpPower_ = jumpPower;
    }

    /**
     * Initialize
     * @override
     */
    init() {
        super.init();
        this.inAirCount_ = 0;
        this.jumpPressedTime_ = 0;
        this.jumpDeltaTime_ = 0;

        /**
         * Reserved velocity of X
         * @type {number}
         */
        this.reservedVelocityX = this.entity.body.velocityX;
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt - delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        // animation
        this.entity.body.setNextAddVelocity(-this.entity.body.velocityX / 11, 0);
        if (Input.it.isPressed(Input.key.up())) {
            this.jumpPressedTime_ += 1;
        }
        this.jumpDeltaTime_ += 1;

        // judge
        if (!Util.onGround(this.entity)) {
            if (++this.inAirCount_ > 5) {
                this.ai.changeState(`stationary`);
            }
        } else {
            this.inAirCount_ = 0;
        }
        if (this.stateAnimation.isEnded() && this.inAirCount_ == 0) {
            // reset and jump
            this.entity.body.setNextAddVelocity(this.reservedVelocityX * 0.8 - this.entity.body.velocityX, -this.entity.body.velocityY);
            this.entity.body.enforce(0, -this.jumpPower_ * this.entity.material.mass * 1000 / dt * (this.jumpPressedTime_ + this.jumpDeltaTime_) / 2 / this.jumpDeltaTime_);
            this.ai.changeState(`jumping`);
        }

        return true;
    }
}

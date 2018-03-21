/**
 * State of player's jump
 * @implements {State}
 * @classdesc State of player's jump
 */
class PJumpState extends State { // eslint-disable-line  no-unused-vars
    /**
     * Player jump state constructor
     * @constructor
     * @param {number} jumpPower Jumping force
     */
    constructor(jumpPower) {
        super();

        /**
         * Count for animation
         * @private
         * @type {number}
         */
        this.jumpCount_ = 0;

        /**
         * Count for judging on air
         * @private
         */
        this.inAirCount_ = 0;

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
        this.jumpCount_ = 0;
        this.inAirCount_ = 0;

        /**
         * Reserved velocity of X
         * @type {number}
         */
        this.velocityX = this.entity.body.preVelocityX;
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt - delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        // animation
        this.entity.body.setNextAddVelocity(this.entity.body.preVelocityX / 1.1 - this.entity.body.preVelocityX, 0);
        this.jumpCount_ += dt / 200;

        // judge
        if (!Util.onGround(this.entity)) {
            if (++this.inAirCount_ > 5) {
                this.ai.changeState(`stationary`);
            }
        } else {
            this.inAirCount_ = 0;
        }

        if (this.jumpCount_ >= 3 && this.inAirCount_ == 0) {
            // reset and jump
            this.entity.body.setNextAddVelocity(this.velocityX - this.entity.body.preVelocityX, -this.entity.body.preVelocityY);
            this.entity.body.enforce(0, -this.jumpPower_ * 1000 / dt);
            this.ai.changeState(`jumping`);
        }

        return true;
    }

    /**
     * Render entity by this state
     * @override
     * @param {Context} ctx - canvas context
     * @param {number} [shiftX = 0] shift x position
     * @param {number} [shiftY = 0] shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        ctx.drawImage(this.entity.imageID, this.entity.x + shiftX, this.entity.y + shiftY, this.entity.width, this.entity.height, (Math.floor(this.jumpCount_)) * 32, 80 - this.entity.directionX * 16, 32, 32);
    }
}

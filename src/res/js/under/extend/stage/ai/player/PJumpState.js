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
         * @type {number}
         */
        this.jumpCount_ = 0;

        /**
         * Direction for animation
         * @type {number}
         */
        this.jumpDirection_ = 0;

        /**
         * Jumping force
         * @type {number}
         */
        this.jumpPower_ = jumpPower;
    }
    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt - delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        // animation
        this.jumpDirection_ = this.velocityX < 0 ? 3 : 2;
        if (this.jumpCount_ == 0) {
            /**
             * Reserved velocity of X
             * @type {number}
             */
            this.velocityX = this.entity.body.velocityX;
        }
        if (this.jumpCount_ < 3) {
            this.entity.body.velocityX /= 1.1;
            this.jumpCount_ += dt / 100;
        } else {
            // reset
            this.entity.body.velocityX = this.velocityX;
            this.entity.body.velocityY = 0;
            this.entity.body.vmy = 0;
            this.entity.body.accelerationY = 0;
            this.entity.body.enforce(0, -this.jumpPower_ * 1000 / dt);
            this.ai.changeState(new PJumpingState(this.jumpPower_));
        }
        return true;
    }

    /**
     * Render entity by this tate
     * @override
     * @param {Context} ctx - canvas context
     * @param {number} [shiftX = 0] shift x position
     * @param {number} [shiftY = 0] shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        ctx.drawImage(this.entity.imageID, (Math.floor(this.jumpCount_)) * 32, this.jumpDirection_ * 32, 32, 32, this.entity.x + shiftX, this.entity.y + shiftY, this.entity.width, this.entity.height);
    }
}

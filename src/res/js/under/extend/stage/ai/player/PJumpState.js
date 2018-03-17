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
         * Count for judging on air
         */
        this.inAirCount_ = 0;

        /**
         * Jumping force
         * @type {number}
         */
        this.jumpPower_ = jumpPower;
    }

    /**
     * Initialize
     * @override
     */
    init() {
        /**
         * Reserved velocity of X
         * @type {number}
         */
        this.velocityX = this.entity.body.velocityX;
    }

    /**
     * Make stationary state
     * @return {State} stationary state
     */
    makeStationaryState() {
        return new PStationaryState();
    }

    /**
     * Make jumping state
     * @return {State} jumping state
     */
    makeJumpingState() {
        return new PJumpingState();
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt - delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        // animation
        this.entity.body.velocityX /= 1.1;
        this.jumpCount_ += dt / 200;

        // judge
        if (!Util.onGround(this.entity)) {
            if (++this.inAirCount_ > 5) {
                this.ai.changeState(this.makeStationaryState());
            }
        } else {
            this.inAirCount_ = 0;
        }

        if (this.jumpCount_ >= 3 && this.inAirCount_ == 0) {
            // reset and jump
            this.entity.body.velocityX = this.velocityX;
            this.entity.body.velocityY = 0;
            this.entity.body.vmy = 0;
            this.entity.body.accelerationY = 0;
            this.entity.body.enforce(0, -this.jumpPower_ * 1000 / dt);
            this.ai.changeState(this.makeJumpingState());
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
        ctx.drawImage(this.entity.imageID, (Math.floor(this.jumpCount_)) * 32, 80 - this.entity.direction * 16, 32, 32, this.entity.x + shiftX, this.entity.y + shiftY, this.entity.width, this.entity.height);
    }
}

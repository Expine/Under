/**
 * State of player's jump
 * @implements {State}
 * @classdesc State of player's jump
 */
class PJumpState extends State { // eslint-disable-line  no-unused-vars
    /**
     * Player jump state constructor
     * @constructor
     */
    constructor() {
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
    }
    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt - delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        // animation
        if (this.jumpCount_ < 3) {
            this.jumpCount_ += dt / 50;
        }
        this.jumpDirection_ = this.entity.body.velocityX < 0 ? 3 : 2;

        // input
        let input = false;
        let vx = 0;
        if (Input.it.isLeftPressed()) {
            vx += -300;
            input = true;
        }
        if (Input.it.isRightPressed()) {
            vx += 300;
            input = true;
        }
        if (input) {
            if (this.entity.body.velocityX * vx < 0 || Math.abs(this.entity.body.velocityX) < Math.abs(vx)) {
                this.entity.body.enforce(vx * 30 / dt, 0);
            } else {
                this.entity.body.velocityX = vx;
            }
        }
        if (Util.onGround(this.entity)) {
            if (Math.abs(this.entity.body.velocityX) < 10) {
                this.ai.changeState(new PStationaryState());
            } else {
                this.ai.changeState(new PWalkState());
            }
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
        //        ctx.drawImage(this.entity.imageID, this.entity.x + shiftX, this.entity.y + shiftY, this.entity.width, this.entity.height);
        ctx.drawImage(this.entity.imageID, (Math.floor(this.jumpCount_)) * 32, this.jumpDirection_ * 32, 32, 32, this.entity.x + shiftX, this.entity.y + shiftY, this.entity.width, this.entity.height);
    }
}

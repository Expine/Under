/**
 * State of player jumping
 * @implements {State}
 * @classdesc State of player jumping
 */
class PJumpingState extends State { // eslint-disable-line  no-unused-vars
    /**
     * Player jump state constructor
     * @constructor
     * @param {number} jumpPower Jumping force
     */
    constructor(jumpPower) {
        super();

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
        // input
        let vx = 0;
        if (Input.it.isLeftPressed()) {
            vx += -300;
        }
        if (Input.it.isRightPressed()) {
            vx += 300;
        }
        if (Math.abs(vx) > 0) {
            this.entity.direction = Math.sign(vx);
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
        ctx.drawImage(this.entity.imageID, 96, 80 - this.entity.direction * 16, 32, 32, this.entity.x + shiftX, this.entity.y + shiftY, this.entity.width, this.entity.height);
    }
}

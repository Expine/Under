/**
 * State of player jumping
 * @implements {State}
 * @classdesc State of player jumping
 */
class PJumpingState extends State { // eslint-disable-line  no-unused-vars
    /**
     * Make stationary state
     * @return {State} stationary state
     */
    makeStationaryState() {
        return new PStationaryState();
    }

    /**
     * Make walk state
     * @return {State} walk state
     */
    makeWalkState() {
        return new PWalkState();
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt - delta time
     * @return {bool} Whether decided on action
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
            this.entity.directionX = Math.sign(vx);
            if (this.entity.body.preVelocityX * vx < 0 || Math.abs(this.entity.body.preVelocityX) < Math.abs(vx)) {
                this.entity.body.enforce(vx * 30 / dt, 0);
            }
        }
        if (Util.onGround(this.entity)) {
            if (Math.abs(this.entity.body.preVelocityX) < 10) {
                this.ai.changeState(this.makeStationaryState());
            } else {
                this.ai.changeState(this.makeWalkState());
            }
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
        ctx.drawImage(this.entity.imageID, this.entity.x + shiftX, this.entity.y + shiftY, this.entity.width, this.entity.height, 96, 80 - this.entity.directionX * 16, 32, 32);
    }
}

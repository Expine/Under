/**
 * State of walking player
 * @classdesc State of walking player
 */
class PWalkState extends State { // eslint-disable-line  no-unused-vars
    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt - delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        let ret = false;
        let vx = 0;
        if (Input.it.isLeftPressed()) {
            vx += -300;
            ret = true;
        }
        if (Input.it.isRightPressed()) {
            vx += 300;
            ret = true;
        }
        if (Math.abs(vx) > 0) {
            if (Math.abs(this.entity.body.velocityX) < Math.abs(vx)) {
                this.entity.body.enforce(vx * 60 / dt, 0);
            } else {
                this.entity.body.velocityX = vx;
            }
        }
        if (Input.it.isUpPressed() && Util.onGround(this.entity)) {
            // reset
            this.entity.body.velocityY = 0;
            this.entity.body.vmy = 0;
            this.entity.body.accelerationY = 0;
            this.entity.body.enforce(0, -300 * 1000 / dt);
            ret = true;
        }
        if (!ret && Math.abs(this.entity.body.velocityX) < 10) {
            this.ai.changeState(new PStationaryState());
        }
        return ret;
    }

    /**
     * Render entity by this tate
     * @override
     * @param {Context} ctx - canvas context
     * @param {number} [shiftX = 0] shift x position
     * @param {number} [shiftY = 0] shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        ctx.drawImage(this.entity.imageID, this.entity.x + shiftX, this.entity.y + shiftY, this.entity.width, this.entity.height);
    }
}

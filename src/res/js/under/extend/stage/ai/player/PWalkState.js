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
        let it = 25;
        let w = 12;
        let h = 12;
        let vx = 0;
        let vy = 0;
        if (Input.it.isUpPressed() && Util.onGround(this.entity)) {
            vy += -h * it;
            ret = true;
        }
        if (Input.it.isLeftPressed()) {
            vx += -w * it;
            ret = true;
        }
        if (Input.it.isRightPressed()) {
            vx += w * it;
            ret = true;
        }
        if (Math.abs(vy) > 0) {
            // reset
            this.entity.body.velocityY = 0;
            this.entity.body.vmy = 0;
            this.entity.body.accelerationY = 0;
            this.entity.body.enforce(0, vy * 1000 / dt);
            // this.entity.body.velocityY = vy;
        }
        if (Math.abs(vx) > 0) {
            if (Math.abs(this.entity.body.velocityX) < Math.abs(vx)) {
                this.entity.body.enforce(vx * 60 / dt, 0);
            } else {
                this.entity.body.velocityX = vx;
            }
            // this.entity.body.velocityX = vx;
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

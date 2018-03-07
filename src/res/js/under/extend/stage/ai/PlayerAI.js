/**
 * Player AI
 * Operates by input
 * @implements {AI}
 * @classdesc Player AI to operate by input
 */
class PlayerAI extends AI { // eslint-disable-line  no-unused-vars
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
        let h = 10;
        let vx = 0;
        let vy = 0;
        if (Input.it.isUpPressed() && this.entity.onGround()) {
            vy += -h * it;
            this.entity.body.velocityY = 0;
            this.entity.body.accelerationY = 0;
            ret = true;
        }
        /*
        if (Input.it.isDownPressed()) {
            vy += h * it;
            ret = true;
        }
        */
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
            if (this.entity.body.velocityX * vx < 0) {
                this.entity.body.enforce(vx * 180 / dt, 0);
            } else if (Math.abs(this.entity.body.velocityX) < Math.abs(vx)) {
                this.entity.body.enforce(vx * 60 / dt, 0);
            } else {
                this.entity.body.velocityX = vx;
            }
            // this.entity.body.velocityX = vx;
        }
        return ret;
    }
}

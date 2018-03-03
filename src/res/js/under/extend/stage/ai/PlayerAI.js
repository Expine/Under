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
        let it = 50;
        let w = 6;
        let h = 5;
        let vx = 0;
        let vy = 0;
        if (Input.it.isUpPressed()) {
            vy += -h * it;
            ret = true;
        }
        if (Input.it.isDownPressed()) {
            vy += h * it;
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
            /*
            if (Math.abs(this.entity.body.velocityY) < Math.abs(vy)) {
                this.entity.body.enforce(0, vy);
            } else {
                this.entity.body.velocityY = vy;
            }
            */
            this.entity.body.velocityY = vy;
        }
        if (Math.abs(vx) > 0) {
            /*
            if (Math.abs(this.entity.body.velocityX) < Math.abs(vx)) {
                this.entity.body.enforce(vx, 0);
            } else {
                this.entity.body.velocityX = vx;
            }
            */
        }
        this.entity.body.velocityX = vx;
        return ret;
    }
}

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
        let d = 10;
        //        this.entity.body.velocityX = 0;
        if (Input.it.isUpPressed()) {
            if (this.entity.body.velocityY > -h * it) {
                this.entity.body.enforce(0, -h * it);
            } else {
                this.entity.body.velocityY = -h * it;
            }
            //            this.entity.body.velocityY = -h * it;
            ret = true;
        }
        if (Input.it.isDownPressed()) {
            if (this.entity.body.velocityY < -h * it) {
                this.entity.body.enforce(0, h * it);
            } else {
                this.entity.body.velocityY = h * it;
            }
            //            this.entity.body.velocityY = h * it;
            ret = true;
        }
        if (Input.it.isLeftPressed()) {
            if (this.entity.body.velocityX > -w * it) {
                this.entity.body.enforce(-w * it / d, 0);
            } else {
                this.entity.body.velocityX = -w * it;
            }
            //            this.entity.body.velocityX = -w * it;
            ret = true;
        }
        if (Input.it.isRightPressed()) {
            if (this.entity.body.velocityX < w * it) {
                this.entity.body.enforce(w * it / d, 0);
            } else {
                this.entity.body.velocityX = w * it;
            }
            //            this.entity.body.velocityX = w * it;
            ret = true;
        }
        return ret;
    }
}

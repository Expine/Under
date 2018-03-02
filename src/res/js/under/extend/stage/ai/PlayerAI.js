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
        let it = 8;
        this.entity.body.velocityX = 0;
        if (Input.it.isUpPressed()) {
            this.entity.body.velocityY = -it;
            ret = true;
        }
        if (Input.it.isDownPressed()) {
            this.entity.body.velocityY = it;
            ret = true;
        }
        if (Input.it.isLeftPressed()) {
            this.entity.body.velocityX = -it;
            ret = true;
        }
        if (Input.it.isRightPressed()) {
            this.entity.body.velocityX = it;
            ret = true;
        }
        return ret;
    }
}

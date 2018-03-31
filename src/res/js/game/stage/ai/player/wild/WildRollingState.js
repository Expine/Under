/**
 * State of wild rolling action
 * @implements {UnderPlayerState}
 * @classdesc State of wild rolling action
 */
class WildRollingState extends UnderPlayerState { // eslint-disable-line  no-unused-vars
    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt - delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        // change state
        if (Util.onGround(this.entity)) {
            this.entity.body.setNextAddVelocity(-this.entity.body.preVelocityX, 0);
            if (this.entity.body.isFix) {
                this.ai.changeState(`stationary`);
            } else {
                this.ai.changeState(`walk`);
            }
        }
        return true;
    }
}

/**
 * Wild rolling state
 * - Determines the operation by AI according to the state and renders based on state
 * - Enable to set animation
 * - Base state for rendering state animation
 * - Basic information can be transferred to another state
 * - Render entity by entity own image ID for change type
 * - ### Stops rolling after landing
 * @implements {UnderPlayerState}
 * @classdesc Wild rolling state to stop rolling after landing
 */
class WildRollingState extends UnderPlayerState { // eslint-disable-line  no-unused-vars
    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        // change state
        if (Util.onGround(this.entity)) {
            this.entity.body.setNextAddVelocity(-this.entity.body.velocityX, 0);
            if (this.entity.body.isFixX) {
                this.ai.changeState(`stationary`);
            } else {
                this.ai.changeState(`walk`);
            }
        }
        return true;
    }
}

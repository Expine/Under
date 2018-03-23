/**
 * State of wild's jump
 * @implements {NormalJumpState}
 * @classdesc State of wild's jump
 */
class WildJumpState extends NormalJumpState { // eslint-disable-line  no-unused-vars
    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt - delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        // animation
        this.stateAnimation.update(dt * 4);
        return super.apply(dt);
    }
}

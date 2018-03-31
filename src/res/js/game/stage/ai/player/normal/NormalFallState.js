/**
 * State of normal fall
 * @implements {NormalJumpingState}
 * @classdesc State of normal fall
 */
class NormalFallState extends NormalJumpingState { // eslint-disable-line  no-unused-vars
    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt - delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        if (this.stateAnimation.isEnded() && !this.stateAnimation.isLoop()) {
            this.ai.changeState(`falling`);
        }
        return super.apply(dt);
    }
}

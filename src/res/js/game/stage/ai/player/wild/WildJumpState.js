/**
 * State of wild's jump
 * @implements {PJumpState}
 * @classdesc State of wild's jump
 */
class WildJumpState extends PJumpState { // eslint-disable-line  no-unused-vars
    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt - delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        // animation
        this.jumpCount_ += dt / 25;
        return super.apply(dt);
    }
}

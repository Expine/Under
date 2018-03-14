/**
 * State of wild's jump
 * @implements {PJumpState}
 * @classdesc State of wild's jump
 */
class WildJumpState extends PJumpState { // eslint-disable-line  no-unused-vars
    /**
     * Make stationary state
     * @return {State} stationary state
     */
    makeStationaryState() {
        return new WildStationaryState();
    }

    /**
     * Make jumping state
     * @return {State} jumping state
     */
    makeJumpingState() {
        return new WildJumpingState();
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt - delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        // animation
        this.jumpCount_ += dt / 25;
        return super.apply(dt);
    }
}

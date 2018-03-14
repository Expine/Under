/**
 * State of wild jumping
 * @implements {PJumpingState}
 * @classdesc State of wild jumping
 */
class WildJumpingState extends PJumpingState { // eslint-disable-line  no-unused-vars
    /**
     * Make stationary state
     * @return {State} stationary state
     */
    makeStationaryState() {
        return new WildStationaryState();
    }

    /**
     * Make walk state
     * @return {State} walk state
     */
    makeWalkState() {
        return new WildWalkState();
    }
}

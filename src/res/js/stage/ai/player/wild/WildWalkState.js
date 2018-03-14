/**
 * State of walking wild
 * @implements {PWalkState}
 * @classdesc State of walking wild
 */
class WildWalkState extends PWalkState { // eslint-disable-line  no-unused-vars
    /**
     * Wild walk state constructor
     * @constructor
     */
    constructor() {
        super();

        this.maxVelocityX = 400;
        this.walkPower = 24000;
    }

    /**
     * Make stationary state
     * @return {State} stationary state
     */
    makeStationaryState() {
        return new WildStationaryState();
    }

    /**
     * Make jump state
     * @return {State} jump state
     */
    makeJumpState() {
        return new WildJumpState(440);
    }

    /**
     * Make attack state
     * @return {State} attack state
     */
    makeAttackState() {
        return new WildClawState();
    }
}

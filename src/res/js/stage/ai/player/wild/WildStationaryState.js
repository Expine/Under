/**
 * State of wild's stationary
 * @implements {PStationaryState}
 * @classdesc State of wild's stationary
 */
class WildStationaryState extends PStationaryState { // eslint-disable-line  no-unused-vars
    /**
     * Wild stationary state constructor
     * @constructor
     */
    constructor() {
        super();

        this.maxVelocityX = 400;
        this.walkPower = 48000;
    }

    /**
     * Make walk state
     * @return {State} walk state
     */
    makeWalkState() {
        return new WildWalkState();
    }

    /**
     * Make jump state
     * @return {State} jump state
     */
    makeJumpState() {
        return new WildJumpState(370);
    }

    /**
     * Make attack state
     * @return {State} attack state
     */
    makeAttackState() {
        return new WildClawState();
    }
}

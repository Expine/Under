/**
 * Wild base State AI
 * AI with state
 * @implements {TransferableStateAI}
 * @classdesc AI with state for determining action
 */
class WildBaseStateAI extends TransferableStateAI { // eslint-disable-line  no-unused-vars
    /**
     * Wild base State AI Constructor
     * @constructor
     */
    constructor() {
        super(`stationary`);

        this.namedStates[`stationary`] = new NormalStationaryState(400, 48000);
        this.namedStates[`walk`] = new NormalWalkState(400, 24000);
        this.namedStates[`jump`] = new WildJumpState(400);
        this.namedStates[`walkjump`] = new WildJumpState(460);
        this.namedStates[`jumping`] = new NormalJumpingState(300, 18000);
        this.namedStates[`fall`] = new NormalFallState(300, 18000);
        this.namedStates[`falling`] = new NormalFallState(300, 18000);
        this.namedStates[`attack`] = new WildClawState();
        this.namedStates[`grab`] = new NormalGrabState();
        this.namedStates[`special`] = new WildSpecialState(780000, 240000);
    }
}

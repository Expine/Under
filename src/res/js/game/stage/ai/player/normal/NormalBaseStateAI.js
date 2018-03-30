/**
 * Normal base state AI
 * AI with state
 * @extends {TransferableStateAI}
 * @classdesc AI with state for determining action
 */
class NormalBaseStateAI extends TransferableStateAI { // eslint-disable-line  no-unused-vars
    /**
     * Normal base state AI constructor
     * @constructor
     */
    constructor() {
        super(`stationary`);

        this.namedStates[`stationary`] = new NormalStationaryState(300, 36000);
        this.namedStates[`walk`] = new NormalWalkState(300, 18000);
        this.namedStates[`jump`] = new NormalJumpState(240);
        this.namedStates[`walkjump`] = new NormalJumpState(320);
        this.namedStates[`jumping`] = new NormalJumpingState(200, 12000);
        this.namedStates[`attack`] = new NormalPunchState();
        this.namedStates[`grab`] = new NormalGrabState();
        this.namedStates[`special`] = new NormalSpecialState();
    }
}

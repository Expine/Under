/**
 * Normal base state AI
 * AI with state
 * @extends {UnderStateAI}
 * @classdesc AI with state for determining action
 */
class NormalBaseStateAI extends UnderStateAI { // eslint-disable-line  no-unused-vars
    /**
     * Normal base state AI constructor
     * @constructor
     */
    constructor() {
        super(`stationary`);

        this.specialActionName = `pray`;
        this.namedStates[`stationary`] = new NormalStationaryState(300, 36000);
        this.namedStates[`walk`] = new NormalWalkState(300, 18000);
        this.namedStates[`jump`] = new NormalJumpState(240);
        this.namedStates[`walkjump`] = new NormalJumpState(320);
        this.namedStates[`jumping`] = new NormalJumpingState(200, 12000);
        this.namedStates[`fall`] = new NormalFallState(200, 12000);
        this.namedStates[`falling`] = new NormalFallState(200, 12000);
        this.namedStates[`attack`] = new NormalPunchState();
        this.namedStates[`grab`] = new NormalGrabState(100, 30000);
        this.namedStates[`grabwalk`] = new NormalGrabState(100, 15000);
        this.namedStates[`pray`] = new NormalSpecialState();
        this.namedStates[`roll`] = new NormalNoneState();
        this.namedStates[`rolling`] = new NormalNoneState();
        this.namedStates[`hook`] = new NormalNoneState();
    }
}

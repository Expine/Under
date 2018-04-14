/**
 * Normal base state AI
 * - Determines the behavior of an entity
 * - Determines by state
 * - Manages state by name
 * - Basic information can be transferred to another state AI
 * - Changes special state by alias
 * - ### Initializes by normal state
 * @extends {UnderStateAI}
 * @classdesc Normal base state AI to initialize by normal state
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
        this.namedStates[`jumping`] = new NormalJumpingState(225, 12000);
        this.namedStates[`fall`] = new NormalFallState(225, 12000);
        this.namedStates[`falling`] = new NormalFallState(225, 12000);
        this.namedStates[`attack`] = new NormalPunchState();
        this.namedStates[`grab`] = new NormalGrabState(100, 30000);
        this.namedStates[`grabwalk`] = new NormalGrabState(100, 15000);
        this.namedStates[`pray`] = new NormalSpecialState();
    }
}

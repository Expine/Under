/**
 * Adventurer base State AI
 * - Determines the behavior of an entity
 * - Determines by state
 * - Manages state by name
 * - Basic information can be transferred to another state AI
 * - Changes special state by alias
 * - Initializes by normal state
 * - ### Initializes by adventurer state
 * @extends {NormalBaseStateAI}
 * @classdesc Adventurer base state AI to initialize by adventurer state
 */
class AdventurerBaseStateAI extends NormalBaseStateAI { // eslint-disable-line  no-unused-vars
    /**
     * Adventurer base State AI Constructor
     * @constructor
     */
    constructor() {
        super();

        this.specialActionName = `hook`;
        for (let name in this.namedStates) {
            if (this.namedStates.hasOwnProperty(name)) {
                let state = this.namedStates[name];
                if (BaseUtil.implementsOf(state, IMovableState)) {
                    state.setMaxVelocity(state.maxVX * 7 / 6, state.maxVY * 7 / 6);
                    state.setMovePower(state.movePX * 7 / 6, state.movePY * 7 / 6);
                }
                if (BaseUtil.implementsOf(state, IPrepareState)) {
                    state.speedMagnification = state.speedMagnification * 3;
                    state.appliedPower = state.appliedPower * 5 / 4;
                }
            }
        }
        this.namedStates[`stationary`] = new AdventurerStationaryState(350, 42000);
        this.namedStates[`walk`] = new AdventurerWalkState(350, 21000);
        this.namedStates[`grab`] = new AdventurerGrabState(110, 30000);
        this.namedStates[`jumping`] = new AdventurerJumpingState(262.5, 14000);
        this.namedStates[`fall`] = new AdventurerFallState(250, 15000);
        this.namedStates[`falling`] = new AdventurerFallState(250, 15000);
        // TODO: Adventurer attack state
        this.namedStates[`attack`] = new NormalPunchState();
        this.namedStates[`hook`] = new AdventurerHookState();
        this.namedStates[`downwall`] = new AdventurerDownWallState(250, 15000);
    }
}

/**
 * Propeller base state AI
 * - Determines the behavior of an entity
 * - Determines by state
 * - Manages state by name
 * - Basic information can be transferred to another state AI
 * - Changes special state by alias
 * - Initializes by normal state
 * - ### Initializes by propeller state
 * @extends {NormalBaseStateAI}
 * @classdesc Propeller base state AI to initialize by propeller state
 */
class PropellerBaseStateAI extends NormalBaseStateAI {
    /**
     * Propeller base state AI Constructor
     * @constructor
     */
    constructor() {
        super();

        this.specialActionName = `none`;
        for (const name in this.namedStates) {
            if (this.namedStates.hasOwnProperty(name)) {
                const state = this.namedStates[name];
                if (BaseUtil.implementsOf(state, IMovableState)) {
                    state.setMaxVelocity(state.maxVX * 7 / 6, state.maxVY * 7 / 6);
                    state.setMovePower(state.movePX * 7 / 6, state.movePY * 7 / 6);
                }
                if (BaseUtil.implementsOf(state, IPrepareState)) {
                    state.appliedPower = state.appliedPower * 2;
                }
            }
        }
        this.namedStates[`jumping`] = new PropellerJumpingState(350, 500, 21000, 30000);
    }
}

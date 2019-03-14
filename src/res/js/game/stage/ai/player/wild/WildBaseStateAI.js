/**
 * Wild base state AI
 * - Determines the behavior of an entity
 * - Determines by state
 * - Manages state by name
 * - Basic information can be transferred to another state AI
 * - Changes special state by alias
 * - Initializes by normal state
 * - ### Initializes by wild state
 * @extends {NormalBaseStateAI}
 * @classdesc Wild base state AI to initialize by wild state
 */
class WildBaseStateAI extends NormalBaseStateAI {
    /**
     * Wild base state AI Constructor
     * @constructor
     */
    constructor() {
        super();

        this.specialActionName = `roll`;
        for (const name in this.namedStates) {
            if (this.namedStates.hasOwnProperty(name)) {
                const state = this.namedStates[name];
                if (BaseUtil.implementsOf(state, IMovableState)) {
                    state.setMaxVelocity(state.maxVX * 4 / 3, state.maxVY * 4 / 3);
                    state.setMovePower(state.movePX * 5 / 4, state.movePY * 5 / 3);
                }
                if (BaseUtil.implementsOf(state, IPrepareState)) {
                    state.speedMagnification = state.speedMagnification * 5;
                    state.appliedPower = state.appliedPower * 3 / 2;
                }
            }
        }

        this.namedStates[`attack`] = new WildClawState();
        this.namedStates[`roll`] = new WildRollState(880000, 240000);
        this.namedStates[`rolling`] = new WildRollingState();
    }
}

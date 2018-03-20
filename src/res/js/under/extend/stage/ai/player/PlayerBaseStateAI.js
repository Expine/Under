/**
 * Player base State AI
 * AI with state
 * @extends {NamedStateAI}
 * @classdesc AI with state for determining action
 */
class PlayerBaseStateAI extends NamedStateAI { // eslint-disable-line  no-unused-vars
    /**
     * Player base State AI Constructor
     * @constructor
     */
    constructor() {
        super(`stationary`);

        this.namedStates[`stationary`] = PStationaryState.bind(PStationaryState, 300, 36000);
        this.namedStates[`walk`] = PWalkState.bind(PWalkState, 300, 18000);
        this.namedStates[`jump`] = PJumpState.bind(PJumpState, 300);
        this.namedStates[`jumping`] = PJumpingState;
        this.namedStates[`attack`] = PPunchState;
    }
}

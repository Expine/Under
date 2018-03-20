/**
 * Wild base State AI
 * AI with state
 * @implements {NamedStateAI}
 * @classdesc AI with state for determining action
 */
class WildBaseStateAI extends NamedStateAI { // eslint-disable-line  no-unused-vars
    /**
     * Wild base State AI Constructor
     */
    constructor() {
        super(new WildStationaryState());

        this.namedStates[`stationary`] = PStationaryState.bind(PStationaryState, 400, 48000);
        this.namedStates[`walk`] = PWalkState.bind(PWalkState, 400, 24000);
        this.namedStates[`jump`] = WildJumpState.bind(WildJumpState, 300);
        this.namedStates[`jumping`] = PJumpingState;
        this.namedStates[`attack`] = WildClawState;
    }
}

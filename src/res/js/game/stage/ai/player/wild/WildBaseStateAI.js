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
        super(`stationary`);

        this.namedStates[`stationary`] = new PStationaryState(400, 48000);
        this.namedStates[`walk`] = new PWalkState(400, 24000);
        this.namedStates[`jump`] = new WildJumpState(370);
        this.namedStates[`walkjump`] = new WildJumpState(440);
        this.namedStates[`jumping`] = new PJumpingState(300, 18000);
        this.namedStates[`attack`] = new WildClawState();
    }
}

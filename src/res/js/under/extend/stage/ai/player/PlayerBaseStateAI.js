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

        this.namedStates[`stationary`] = new PStationaryState(300, 36000);
        this.namedStates[`walk`] = new PWalkState(300, 18000);
        this.namedStates[`jump`] = new PJumpState(230);
        this.namedStates[`walkjump`] = new PJumpState(300);
        this.namedStates[`jumping`] = new PJumpingState(200, 12000);
        this.namedStates[`attack`] = new PPunchState();
    }
}

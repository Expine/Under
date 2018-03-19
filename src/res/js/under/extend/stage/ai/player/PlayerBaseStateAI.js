/**
 * Player base State AI
 * AI with state
 * @implements {BaseStateAI}
 * @classdesc AI with state for determining action
 */
class PlayerBaseStateAI extends BaseStateAI { // eslint-disable-line  no-unused-vars
    /**
     * Player base State AI Constructor
     * @constructor
     */
    constructor() {
        super(new PStationaryState());
    }
}

/**
 * Wild base State AI
 * AI with state
 * @classdesc AI with state for determining action
 */
class WildBaseStateAI extends BaseStateAI { // eslint-disable-line  no-unused-vars
    /**
     * Wild base State AI Constructor
     */
    constructor() {
        super(new WildStationaryState());
    }
}

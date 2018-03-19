/**
 * Under state AI
 * AI with state
 * @extends {BaseStateAI}
 * @classdesc AI with state for determining action
 */
class UnderStateAI extends BaseStateAI { // eslint-disable-line  no-unused-vars
    /**
     * Under state AI Constructor
     */
    constructor() {
        super(new PUnderState());
    }
}

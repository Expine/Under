/**
 * Under state AI
 * AI with state
 * @extends {NamedStateAI}
 * @classdesc AI with state for determining action
 */
class UnderStateAI extends NamedStateAI { // eslint-disable-line  no-unused-vars
    /**
     * Under state AI Constructor
     * @constructor
     */
    constructor() {
        super(`under`);

        this.namedStates[`under`] = new PUnderState();
    }
}

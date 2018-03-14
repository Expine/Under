/**
 * Under state AI
 * AI with state
 * @classdesc AI with state for determining action
 */
class UnderStateAI extends BaseStateAI { // eslint-disable-line  no-unused-vars
    /**
     * Under state AI Constructor
     * @param {Entity} entity Entity to which AI is attached
     */
    constructor(entity, state) {
        super(entity, new PUnderState());
    }
}

/**
 * Common base state AI
 * AI with state
 * @extends {TransferableStateAI}
 * @classdesc AI with state for determining action
 */
class CommonBaseStateAI extends TransferableStateAI { // eslint-disable-line  no-unused-vars
    /**
     * Common base state AI constructor
     * @constructor
     */
    constructor() {
        super(`none`);

        this.namedStates[`none`] = new CommonNoneState();
        this.namedStates[`gameover`] = new CommonGameoverState();
    }
}

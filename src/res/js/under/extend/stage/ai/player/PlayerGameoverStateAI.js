/**
 * Player gameover State AI
 * AI with state
 * @extends {NamedStateAI}
 * @classdesc AI with state for determining action
 */
class PlayerGameoverStateAI extends NamedStateAI { // eslint-disable-line  no-unused-vars
    /**
     * Player base State AI Constructor
     * @constructor
     */
    constructor() {
        super(`gameover`);

        this.namedStates[`gameover`] = new PGameoverState();
    }
}

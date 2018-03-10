/**
 * State AI
 * AI with state
 * @implements {AI}
 * @classdesc AI with state for determining action
 */
class StateAI extends AI { // eslint-disable-line  no-unused-vars
    /**
     * Get state
     * @interface
     * @return {State} state of ai
     */
    getState() {}

    /**
     * Change state
     * @interface
     * @param {State} state state to change
     */
    changeState(state) {}
}

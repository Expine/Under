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
     * @return {State} State of AI
     */
    getState() {}

    /**
     * Get state by name
     * @interface
     * @return {State} State of AI
     */
    getStateByName() {}

    /**
     * Change state
     * @interface
     * @param {string} state Name of state to change
     */
    changeState(state) {}
}

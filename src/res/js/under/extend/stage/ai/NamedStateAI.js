/**
 * Named state AI
 * - Determines the behavior of an entity
 * - Determines by state
 * - ### Manages state by name
 * @extends {StateAI}
 * @classdesc Named state AI to manage state by name
 */
class NamedStateAI extends StateAI {
    /**
     * Named State AI Constructor
     * @param {string} id Initial state name
     */
    constructor(id) {
        super();

        /**
         * AI State
         * @protected
         * @type {State}
         */
        this.state = null;

        /**
         * AI State name
         * @protected
         * @type {string}
         */
        this.stateName = id;

        /**
         * List of named states
         * Associates a name with a state
         * @protected
         * @type {Object<string, State>}
         */
        this.namedStates = {};
    }

    /**
     * Initialize AI
     * @override
     */
    init() {
        // save
        const state = this.stateName;
        this.stateName = ``;
        this.changeState(state);
    }

    /**
     * Get state
     * @override
     * @return {State} state of ai
     */
    getState() {
        return this.state;
    }

    /**
     * Get currently state ID
     * @abstract
     * @return {string} Currently state ID
     */
    getStateID() {
        return this.stateName;
    }

    /**
     * Set state by name
     * @override
     * @param {State} state State
     * @param {string} id State ID
     */
    setState(state, id) {
        this.namedStates[id] = state;
    }

    /**
     * Change state
     * @override
     * @param {string} id ID of state to change
     * @return {boolean} Whether change state or not
     */
    changeState(id) {
        // Do not process if it is in the same state
        if (id === this.stateName) {
            return false;
        }
        if (this.namedStates[id] === undefined) {
            return false;
        }
        this.stateName = id;
        this.state = this.namedStates[id];
        // initialize
        super.changeState(id);
        return true;
    }
}

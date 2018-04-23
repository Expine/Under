/**
 * Named state AI
 * - Determines the behavior of an entity
 * - Determines by state
 * - ### Manages state by name
 * @implements {StateAI}
 * @classdesc Named state AI to manage state by name
 */
class NamedStateAI extends StateAI { // eslint-disable-line  no-unused-vars
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
        let state = this.stateName;
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
     * Set state by name
     * @override
     * @param {State} state State
     * @param {string} id State ID
     */
    setState(state, id) {
        this.namedStates[id] = state;
    }

    /**
     * Get state by name
     * @override
     * @param {string} id State ID
     * @return {State} State of AI
     */
    getStateByID(id) {
        return this.namedStates[id];
    }

    /**
     * Change state
     * @override
     * @param {string} id ID of state to change
     * @return {boolean} Whether change state or not
     */
    changeState(id) {
        // Do not process if it is in the same state
        if (id == this.stateName) {
            return false;
        }
        if (this.namedStates[id] === undefined) {
            return false;
        }
        this.stateName = id;
        this.state = this.namedStates[id];
        // assign null if it does not exist
        if (this.state === undefined) {
            this.state = null;
            return true;
        }
        // initialize
        super.changeState(id);
        return true;
    }
}

/**
 * Named state AI
 * AI with state
 * Manage the state with a name
 * @implements {StateAI}
 * @classdesc AI with state for determining action
 */
class NamedStateAI extends StateAI { // eslint-disable-line  no-unused-vars
    /**
     * Base State AI Constructor
     * @param {string} state Initial state name
     */
    constructor(state) {
        super();

        /**
         * AI State
         * @private
         * @type {State}
         */
        this.state_ = null;

        /**
         * AI State name
         * @private
         * @type {string}
         */
        this.stateName_ = state;

        /**
         * List of named states
         * Associates a name with a state
         * @protected
         * @type {Dictionary<string, State>}
         */
        this.namedStates = {};
    }

    /**
     * Initialize AI
     * @override
     */
    init() {
        let state = this.stateName_;
        this.stateName_ = ``;
        this.changeState(state);
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt - delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        return this.state_ != null && this.state_.apply(dt);
    }

    /**
     * Update state
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        if (this.state_ != null) {
            this.state_.update(dt);
        }
    }

    /**
     * Get state
     * @override
     * @return {State} state of ai
     */
    getState() {
        return this.state_;
    }

    /**
     * Set state by name
     * @override
     * @param {State} state State
     * @param {string} name State name
     */
    setState(state, name) {
        this.namedStates[name] = state;
    }

    /**
     * Get state by name
     * @override
     * @param {string} state State name
     * @return {State} State of AI
     */
    getStateByName(state) {
        return this.namedStates[state];
    }

    /**
     * Change state
     * @override
     * @param {string} state State to change
     * @return {bool} Whether change state or not
     */
    changeState(state) {
        // Do not process if it is in the same state
        if (state == this.stateName_) {
            return false;
        }
        this.stateName_ = state;
        this.state_ = this.namedStates[state];
        // assign null if it does not exist
        if (this.state_ === undefined) {
            this.state_ = null;
            return true;
        }
        this.state_.setEntity(this.entity);
        this.state_.setAI(this);
        this.state_.init();
        return true;
    }
}

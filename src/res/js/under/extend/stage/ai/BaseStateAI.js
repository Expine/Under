/**
 * Base State AI
 * AI with state
 * @implements {StateAI}
 * @classdesc AI with state for determining action
 */
class BaseStateAI extends StateAI { // eslint-disable-line  no-unused-vars
    /**
     * Base State AI Constructor
     * @param {State} state Initial state
     */
    constructor(state) {
        super();

        this.changeState(state);
    }

    /**
     * Initialize AI
     * @override
     */
    init() {
        this.state_.setEntity(this.entity);
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt - delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        return this.state_.apply(dt);
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
     * Change state
     * @override
     * @param {State} state state to change
     */
    changeState(state) {
        /**
         * AI State
         * @private
         * @type {State}
         */
        this.state_ = state;
        state.setEntity(this.entity);
        state.setAI(this);
        state.init();
    }
}

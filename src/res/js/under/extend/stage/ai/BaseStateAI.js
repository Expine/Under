/**
 * Base State AI
 * AI with state
 * @classdesc AI with state for determining action
 */
class BaseStateAI extends AI { // eslint-disable-line  no-unused-vars
    /**
     * Base State AI Constructor
     * @param {Entity} entity Entity to which AI is attached
     * @param {State} state Initial state
     */
    constructor(entity, state) {
        super(entity);

        this.changeState(state);
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt - delta time
     * @return {boolean} Whether decided on action
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

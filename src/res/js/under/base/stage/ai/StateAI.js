/**
 * State AI
 * - Determines the behavior of an entity
 * - ### Determines by state
 * @interface
 * @extends {AI}
 * @classdesc State AI to determine by state
 */
class StateAI extends AI { // eslint-disable-line  no-unused-vars
    /**
     * Get state
     * @abstract
     * @return {State} State of AI
     */
    getState() {}

    /**
     * Get currently state ID
     * @abstract
     * @return {Object} Currently state ID
     */
    getStateID() {}

    /**
     * Set state by ID
     * @abstract
     * @param {State} state State
     * @param {Object} id State ID
     */
    setState(state, id) {}

    /**
     * Change state
     * @param {Object} id ID of state to change
     * @return {boolean} Whether change state or not
     */
    changeState(id) {
        this.getState().setEntity(this.entity);
        this.getState().setAI(this);
        this.getState().init();
    }

    /**
     * Update state
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        if (this.getState() !== null) {
            this.getState().update(dt);
        }
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        return this.getState() !== null && this.getState().apply(dt);
    }
}

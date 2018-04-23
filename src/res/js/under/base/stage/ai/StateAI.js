/**
 * State AI
 * - Determines the behavior of an entity
 * - ### Determines by state
 * @interface
 * @implements {AI}
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
     * Set state by ID
     * @abstract
     * @param {State} state State
     * @param {Object} id State ID
     */
    setState(state, id) {}

    /**
     * Get state by ID
     * @abstract
     * @param {Object} id State ID
     * @return {State} State of AI
     */
    getStateByID(id) {}

    /**
     * Change state
     * @abstract
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
        if (this.getState() != null) {
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
        return this.getState() != null && this.getState().apply(dt);
    }

    /**
     * Render entity by this state
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        if (this.getState() != null) {
            this.getState().render(ctx, shiftX, shiftY);
        }
    }
}

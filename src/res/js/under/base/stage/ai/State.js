/**
 * State of ai
 * Determine the operation by AI according to the state
 * Also renders based on state
 * @classdesc State of ai to determine the operation
 */
class State { // eslint-disable-line  no-unused-vars
    /**
     * Set entity for targeting
     * @param {AutonomyEntitiy} entity Entity for tageting
     */
    setEntity(entity) {
        /**
         * Entity for targeting
         * @type {AutonomyEntitiy}
         */
        this.entity = entity;
    }

    /**
     * Set AI for operating
     * @param {StateAI} ai AI for operating
     */
    setAI(ai) {
        /**
         * AI for operating
         * @type {StateAI}
         */
        this.ai = ai;
    }

    /**
     * Initialize
     * @interface
     */
    init() {}

    /**
     * Apply AI and decide action
     * @interface
     * @param {number} dt Delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {}

    /**
     * Update state
     * @interface
     * @param {number} dt Delta time
     */
    update(dt) {}

    /**
     * Render entity by this state
     * @interface
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {}
}

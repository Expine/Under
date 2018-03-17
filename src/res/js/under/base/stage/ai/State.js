/**
 * State of ai
 * Determine the operation by AI according to the state
 * @classdesc State of ai to determine the operation
 */
class State { // eslint-disable-line  no-unused-vars
    /**
     * Initialize
     * @interface
     */
    init() {}

    /**
     * Set entity for targeting
     * @param {Entity} entity Entity for tageting
     */
    setEntity(entity) {
        /**
         * Entity for targeting
         * @type {Entity}
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
     * Apply AI and decide action
     * @interface
     * @param {number} dt - delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {}

    /**
     * Render entity by this state
     * @interface
     * @param {Context} ctx - canvas context
     * @param {number} [shiftX = 0] shift x position
     * @param {number} [shiftY = 0] shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {}
}

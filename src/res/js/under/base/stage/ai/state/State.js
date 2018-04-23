/**
 * State
 * - ### Determines the operation by AI according to the state and renders based on state
 * @interface
 * @classdesc State to determine the operation and render by state
 */
class State { // eslint-disable-line  no-unused-vars
    /**
     * State constructor
     * @constructor
     */
    constructor() {
        /**
         * Entity for targeting
         * @type {AutonomyEntitiy}
         */
        this.entity = null;

        /**
         * AI for operating
         * @type {StateAI}
         */
        this.ai = null;
    }

    /**
     * Set entity for targeting
     * @param {AutonomyEntitiy} entity Entity for tageting
     */
    setEntity(entity) {
        this.entity = entity;
    }

    /**
     * Set AI for operating
     * @param {StateAI} ai AI for operating
     */
    setAI(ai) {
        this.ai = ai;
    }

    /**
     * Initialize
     * @abstract
     */
    init() {}

    /**
     * Update state
     * @abstract
     * @param {number} dt Delta time
     */
    update(dt) {}

    /**
     * Apply AI and decide action
     * @abstract
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {}

    /**
     * Render entity by this state
     * @abstract
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {}
}

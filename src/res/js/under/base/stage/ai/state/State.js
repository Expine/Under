/**
 * State
 * - ### Determines the operation by AI according to the state and renders based on state
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
     * @interface
     */
    init() {}

    /**
     * Update state
     * @interface
     * @param {number} dt Delta time
     */
    update(dt) {}

    /**
     * Apply AI and decide action
     * @interface
     * @param {number} dt Delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {}

    /**
     * Render entity by this state
     * @interface
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {}
}

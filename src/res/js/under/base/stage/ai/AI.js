/**
 * AI
 * - ### Determines the behavior of an entity
 * @interface
 * @classdesc AI for determining the behavior of an entity
 */
class AI {
    /**
     * AI constructor
     * @constructor
     */
    constructor() {
        /**
         * Entity to which AI is attached
         * @type {AutonomyEntity}
         */
        this.entity = null;
    }

    /**
     * Set autonomy entity
     * @param {AutonomyEntity} entity Autonomy entity
     */
    setEntity(entity) {
        this.entity = entity;
    }

    /**
     * Initialize AI
     * @abstract
     */
    init() {}

    /**
     * Update AI
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
}

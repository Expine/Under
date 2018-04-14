/**
 * AI
 * - ### Determines the behavior of an entity
 * @classdesc AI for determining the behavior of an entity
 */
class AI { // eslint-disable-line  no-unused-vars
    /**
     * AI constructor
     * @constructor
     */
    constructor() {
        /**
         * Entity to which AI is attached
         * @type {AutonomyEntitiy}
         */
        this.entity = null;
    }

    /**
     * Set autonomy object
     * @param {AutonomyEntitiy} entity
     */
    setEntity(entity) {
        this.entity = entity;
    }

    /**
     * Initialize AI
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
     * Update AI
     * @interface
     * @param {number} dt Delta time
     */
    update(dt) {}
}

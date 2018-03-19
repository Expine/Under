/**
 * AI for determining the behavior of an entity
 * @classdesc AI for determining the behavior of an entity
 */
class AI { // eslint-disable-line  no-unused-vars
    /**
     * Set autonomy object
     * @param {AutonomyObject} entity
     */
    setEntity(entity) {
        /**
         * Entity to which AI is attached
         * @type {AutonomyObject}
         */
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
     * @param {number} dt - delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {}
}

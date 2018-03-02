/**
 * AI for determining the behavior of an entity
 * @classdesc AI for determining the behavior of an entity
 */
class AI { // eslint-disable-line  no-unused-vars
    /**
     * AI Constructor
     * @param {Entity} entity Entity to which AI is attached
     */
    constructor(entity) {
        /**
         * Entity to which AI is attached
         * @type {Entity}
         */
        this.entity = entity;
    }

    /**
     * Apply AI and decide action
     * @interface
     * @param {number} dt - delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {}
}

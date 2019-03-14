/**
 * Named event
 * - Updates and renders event
 * - ### Identified by name
 * @interface
 * @extends {GameEvent}
 * @classdesc Named event that is identified by name
 */
class NamedEvent extends GameEvent {
    /**
     * Named event constructor
     * @constructor
     * @param {string} name Identified name
     */
    constructor(name) {
        super();

        /**
         * Identified name
         * @protected
         * @type {string}
         */
        this.name = name;
    }

    /**
     * Get event's identified name
     * @return {string} Identified name
     */
    getName() {
        return this.name;
    }
}

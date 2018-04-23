/**
 * Game event
 * - ### Updates and renders event
 * @interface
 * @classdesc Game event to update and render event
 */
class GameEvent { // eslint-disable-line  no-unused-vars
    /**
     * Game event constructor
     * @constructor
     */
    constructor() {
        /**
         * Event operator
         * @protected
         * @type {IEventOperator}
         */
        this.op = null;
    }

    /**
     * Set event operator
     * @param {IEventOperator} op Event operator
     */
    setEventOperator(op) {
        this.op = op;
    }

    /**
     * Get event's unique name
     * @return {string} Unique name of event (return null if it is unnecessary)
     */
    getName() {
        return null;
    }

    /**
     * Initialize event
     * @abstract
     */
    init() {}

    /**
     * Destructor of event
     * @abstract
     */
    destruct() {}

    /**
     * Update event
     * @abstract
     * @param {number} dt Delta time
     */
    update(dt) {}

    /**
     * Render event
     * @abstract
     * @param {Context} ctx Canvas context
     */
    render(ctx) {}
}

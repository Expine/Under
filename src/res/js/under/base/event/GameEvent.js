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
     * @abstract
     * @return {string} Unique name of event
     */
    getName() {}

    /**
     * Initialize event
     * @abstract
     */
    init() {}

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

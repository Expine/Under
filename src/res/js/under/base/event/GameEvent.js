/**
 * Game event
 * - ### Updates and renders event
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
     * Initialize event
     * @interface
     */
    init() {}

    /**
     * Update event
     * @interface
     * @param {number} dt Delta time
     */
    update(dt) {}

    /**
     * Render event
     * @interface
     * @param {Context} ctx Canvas context
     */
    render(ctx) {}
}

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
     * @return {boolean} Whether update is endped or not
     */
    update(dt) {
        return true;
    }

    /**
     * Render event
     * @abstract
     * @param {Context} ctx Canvas context
     */
    render(ctx) {}
}

/**
 * Auto input event
 * - Updates and renders event
 * - ### Inputs automatically
 * @extends {GameEvent}
 * @classdesc Auto input event to wait to input automatically
 */
class AutoInputEvent extends GameEvent { // eslint-disable-line  no-unused-vars
    /**
     * Auto input event constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Input orders
         * @protected
         * @type {Array<InputOrder>}
         */
        this.orders = [];
    }

    /**
     * Add input order
     * @param {InputOrder} order Added order
     */
    addOrder(order) {
        this.orders.push(order);
    }

    /**
     * Initialize event
     * @override
     */
    init() {
        Input.key.setInputEnable(false);
        if (this.orders.length > 0) {
            this.orders[0].init();
        }
    }

    /**
     * Destructor of event
     * @override
     */
    destruct() {
        Input.key.setInputEnable(true);
    }

    /**
     * Update event
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether update is endped or not
     */
    update(dt) {
        if (this.orders.length === 0) {
            this.op.next();
            return true;
        }
        // update order
        const order = this.orders[0];
        if (!order.udpate(dt)) {
            return false;
        }
        // next
        this.orders.splice(0, 1);
        order.destruct();
        // judge end
        if (this.orders.length > 0) {
            this.orders[0].init();
            return false;
        }
        // next
        this.op.next();
        return true;
    }
}

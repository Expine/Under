/**
 * Auto input event
 * - Updates and renders event
 * - ### Inputs automatically
 * @extends {GameEvent}
 * @classdesc Auto input event to wait to input automatically
 */
class AutoInputEvent extends GameEvent {
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
        /**
         * Next order number
         * @protected
         * @type {number}
         */
        this.nextOrderNumber = 0;
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
        this.nextOrderNumber = 0;
        if (this.orders.length > 0) {
            this.orders[this.nextOrderNumber].init();
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
        if (this.orders.length <= this.nextOrderNumber) {
            this.op.next();
            return true;
        }
        // update order
        const order = this.orders[this.nextOrderNumber];
        if (!order.udpate(dt)) {
            return false;
        }
        // next
        order.destruct();
        // judge end
        if (this.orders.length > ++this.nextOrderNumber) {
            this.orders[this.nextOrderNumber].init();
            return false;
        }
        // next
        this.op.next();
        return true;
    }
}

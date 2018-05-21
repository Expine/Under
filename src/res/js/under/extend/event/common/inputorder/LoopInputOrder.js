/**
 * Loop input order
 * - Indicates order for delegation of input
 * - ### Loops input order
 * @extends {InputOrder}
 * @classdesc Loop input order to loop input oreder
 */
class LoopInputOrder extends InputOrder { // eslint-disable-line  no-unused-vars
    /**
     * Loop input order constructor
     * @constructor
     * @param {number} loopNumber Number of loop
     */
    constructor(loopNumber) {
        super();

        /**
         * Number of loop
         * @protected
         * @type {number}
         */
        this.loopNumber = loopNumber;

        /**
         * Loop list of input order
         * @protected
         * @type {Array<InputOrder>}
         */
        this.orders = [];
        /**
         * Index of currently running order
         * @protected
         * @type {number}
         */
        this.orderIndex = 0;
    }

    /**
     * Add input order to loop list
     * @param {InputOrder} order Added order
     */
    addOrder(order) {
        this.orders.push(order);
    }

    /**
     * Initialize input order
     * @abstract
     */
    init() {
        this.orderIndex = 0;
        if (this.orders.length > 0) {
            this.orders[this.orderIndex].init();
        }
    }

    /**
     * Update input order
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether order is ended or not
     */
    udpate(dt) {
        if (this.orders.length === 0) {
            return true;
        }
        // update order
        const order = this.orders[this.orderIndex];
        if (!order.udpate(dt)) {
            return false;
        }
        // next
        order.destruct();
        this.orderIndex += 1;
        // judge loop
        if (this.orderIndex < this.orders.length) {
            // init
            this.orders[this.orderIndex].init();
            return false;
        }
        // count loop
        this.orderIndex = 0;
        this.orders[this.orderIndex].init();
        this.loopNumber -= 1;
        if (this.loopNumber <= 0) {
            return true;
        }
        return false;
    }
}

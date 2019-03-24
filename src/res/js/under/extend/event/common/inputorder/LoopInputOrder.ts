import { InputOrder } from "./InputOrder";

/**
 * Loop input order
 * - Loops input order
 * @extends {InputOrder}
 * @classdesc Loop input order to loop input oreder
 */
export class LoopInputOrder extends InputOrder {
    /**
     * Number of loop
     * @protected
     * @type {number}
     */
    protected loopNumber: number;

    /**
     * Loop list of input order
     * @protected
     * @type {Array<InputOrder>}
     */
    protected orders: Array<InputOrder>
    /**
     * Index of currently running order
     * @protected
     * @type {number}
     */
    protected orderIndex: number;

    /**
     * Loop input order constructor
     * @constructor
     * @param {number} loopNumber Number of loop
     */
    constructor(loopNumber: number) {
        super();

        this.loopNumber = loopNumber;
        this.orders = [];
        this.orderIndex = 0;
    }

    /**
     * Add input order to loop list
     * @param {InputOrder} order Added order
     */
    addOrder(order: InputOrder) {
        this.orders.push(order);
    }

    /**
     * Initialize input order
     * @override
     */
    init() {
        this.orderIndex = 0;
        if (this.orders.length > 0) {
            this.orders[this.orderIndex].init();
        }
    }

    /**
     * Destructor of input order
     * @override
     */
    destruct() { }

    /**
     * Update input order
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether order is ended or not
     */
    udpate(dt: number): boolean {
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

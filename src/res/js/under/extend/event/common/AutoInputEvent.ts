import { GameEvent } from "../../../base/event/common/GameEvent";
import { InputOrder } from "./inputorder/InputOrder";
import { Input } from '../../../base/input/Input';
import { Context } from '../../../base/resources/image/Context';

/**
 * Auto input event
 * - Inputs automatically
 * @extends {GameEvent}
 * @classdesc Auto input event to wait to input automatically
 */
export class AutoInputEvent extends GameEvent {
    /**
     * Input orders
     * @protected
     * @type {Array<InputOrder>}
     */
    protected orders: Array<InputOrder>;
    /**
     * Next order number
     * @protected
     * @type {number}
     */
    protected nextOrderNumber: number;

    /**
     * Auto input event constructor
     * @constructor
     */
    constructor() {
        super();

        this.orders = [];
        this.nextOrderNumber = 0;
    }

    /**
     * Add input order
     * @param {InputOrder} order Added order
     */
    addOrder(order: InputOrder) {
        this.orders.push(order);
    }

    /**
     * Initialize event
     * @override
     */
    init() {
        Input.key.setEnable(false);
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
        Input.key.setEnable(true);
    }

    /**
     * Update event
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether update is endped or not
     */
    update(dt: number): boolean {
        if (this.orders.length <= this.nextOrderNumber && this.op !== null) {
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
        if (this.op !== null) {
            this.op.next();
        }
        return true;
    }

    /**
     * Render event
     * @override
     * @param {Context} ctx Canvas context
     */
    render(_ctx: Context) { }
}

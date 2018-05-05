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
         * Target player
         * @protected
         * @type {Entity}
         */
        this.player = null;

        /**
         * Input orders
         * @protected
         * @type {Array<string>}
         */
        this.orders = [];
        /**
         * Currently order index
         * @protected
         * @type {number}
         */
        this.orderIndex = 0;

        // TODO: Should make loop class as input order class
        /**
         * Wait time
         * @protected
         * @type {number}
         */
        this.wait = 0;
        /**
         * Loop number
         * @protected
         * @type {number}
         */
        this.loopNumber = 0;
        /**
         * Loop index
         * @protected
         * @type {number}
         */
        this.loopIndex = 0;
    }

    /**
     * Add input order
     * @param {string} order Input order
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
        this.orderIndex = 0;
        this.wait = 0;
        this.loopNumber = 0;
        this.loopIndex = 0;
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
        Input.key.unpress(Input.key.up());
        Input.key.unpress(Input.key.right());
        Input.key.unpress(Input.key.left());
        Input.key.unpress(Input.key.down());
        while (true) {
            if (this.wait > 0) {
                this.wait -= dt / 1000;
                return false;
            }
            if (this.orderIndex >= this.orders.length) {
                break;
            }
            let order = this.orders[this.orderIndex];
            if (order.endsWith(`loop`)) {
                if (order.startsWith(`end`)) {
                    if (this.loopNumber-- > 0) {
                        this.orderIndex = this.loopIndex;
                        continue;
                    }
                } else {
                    this.loopNumber = parseInt(order.replace(`loop`));
                    this.loopIndex = this.orderIndex + 1;
                }
            } else if (order == `up`) {
                Input.key.press(Input.key.up());
                ++this.orderIndex;
                return false;
            } else if (order == `right`) {
                Input.key.press(Input.key.right());
                ++this.orderIndex;
                return false;
            } else if (order == `left`) {
                Input.key.press(Input.key.left());
                ++this.orderIndex;
                return false;
            } else if (order == `down`) {
                Input.key.press(Input.key.down());
                ++this.orderIndex;
                return false;
            } else if (order.endsWith(`wait`)) {
                this.wait = parseFloat(order.replace(`wait`));
                ++this.orderIndex;
                continue;
            }
            ++this.orderIndex;
        }
        // next
        this.op.next();
        return true;
    }
}

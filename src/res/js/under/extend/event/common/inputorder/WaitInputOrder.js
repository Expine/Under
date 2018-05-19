/**
 * Wait input order
 * - Indicates order for delegation of input
 * - ### Waits
 * @extends {InputOrder}
 * @classdesc Wait input order to wait
 */
class WaitInputOrder extends InputOrder { // eslint-disable-line  no-unused-vars
    /**
     * Input order constructor
     * @constructor
     * @param {number} time Time of waiting
     */
    constructor(time) {
        super();

        /**
         * Time for waiting
         * @protected
         * @type {number}
         */
        this.time = time;
        /**
         * Remaining time
         * @proteted
         * @type {number}
         */
        this.remainingTime = time;
    }

    /**
     * Initialize input order
     * @override
     */
    init() {
        this.remainingTime = this.time;
    }

    /**
     * Update input order
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether order is ended or not
     */
    udpate(dt) {
        return (this.remainingTime -= dt / 1000) <= 0;
    }
}

import { InputOrder } from "./InputOrder";

/**
 * Wait input order
 * - Waits
 * @extends {InputOrder}
 * @classdesc Wait input order to wait
 */
export class WaitInputOrder extends InputOrder {
    /**
     * Time for waiting
     * @protected
     * @type {number}
     */
    protected time: number;
    /**
     * Remaining time
     * @proteted
     * @type {number}
     */
    protected remainingTime: number;

    /**
     * Input order constructor
     * @constructor
     * @param {number} time Time of waiting
     */
    constructor(time: number) {
        super();

        this.time = time;
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
        return (this.remainingTime -= dt / 1000) <= 0;
    }
}

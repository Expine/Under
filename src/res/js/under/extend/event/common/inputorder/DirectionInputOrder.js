/**
 * Direction input order
 * - Indicates order for delegation of input
 * - ### Inputs direction key
 * @extends {InputOrder}
 * @classdesc Direction input order to input direction key
 */
class DirectionInputOrder extends InputOrder {
    /**
     * Direction input order constructor
     * @constructor
     * @param {number} time Time of input action
     * @param {number} directionX X direction for input
     * @param {number} directionY Y direction for input
     */
    constructor(time, directionX, directionY) {
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
        /**
         * X direction for input
         * @protected
         * @type {number}
         */
        this.directionX = directionX;
        /**
         * Y direction for input
         * @protected
         * @type {number}
         */
        this.directionY = directionY;
    }

    /**
     * Initialize input order
     * @override
     */
    init() {
        this.remainingTime = this.time;
        if (this.directionX === 1) {
            Input.key.press(Input.key.right());
        } else if (this.directionX === -1) {
            Input.key.press(Input.key.left());
        }
        if (this.directionY === 1) {
            Input.key.press(Input.key.down());
        } else if (this.directionY === -1) {
            Input.key.press(Input.key.up());
        }
    }

    /**
     * Destructor of input order
     * @override
     */
    destruct() {
        if (this.directionX === 1) {
            Input.key.unpress(Input.key.right());
        } else if (this.directionX === -1) {
            Input.key.unpress(Input.key.left());
        }
        if (this.directionY === 1) {
            Input.key.unpress(Input.key.down());
        } else if (this.directionY === -1) {
            Input.key.unpress(Input.key.up());
        }
    }

    /**
     * Update input order
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether order is ended or not
     */
    udpate(dt) {
        this.remainingTime -= dt / 1000;
        if (this.directionX === 1) {
            Input.key.press(Input.key.right());
        } else if (this.directionX === -1) {
            Input.key.press(Input.key.left());
        }
        if (this.directionY === 1) {
            Input.key.press(Input.key.down());
        } else if (this.directionY === -1) {
            Input.key.press(Input.key.up());
        }
        return this.remainingTime <= 0;
    }
}

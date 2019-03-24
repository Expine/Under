import { InputOrder } from "./InputOrder";
import { Input } from "../../../../base/input/Input";

/**
 * Direction input order
 * - Inputs direction key
 * @extends {InputOrder}
 * @classdesc Direction input order to input direction key
 */
export class DirectionInputOrder extends InputOrder {
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
     * X direction for input
     * @protected
     * @type {number}
     */
    protected directionX: number;
    /**
     * Y direction for input
     * @protected
     * @type {number}
     */
    protected directionY: number;

    /**
     * Direction input order constructor
     * @constructor
     * @param {number} time Time of input action
     * @param {number} directionX X direction for input
     * @param {number} directionY Y direction for input
     */
    constructor(time: number, directionX: number, directionY: number) {
        super();

        this.time = time;
        this.remainingTime = time;
        this.directionX = directionX;
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
    udpate(dt: number): boolean {
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

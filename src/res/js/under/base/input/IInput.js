/**
 * Input interface
 * - ### It can get input state
 * - ### It can make input blocked
 * @interface
 * @classdesc Input interface that can get input state and make input blocked
 */
class IInput extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Set inpt enable
     * @abstract
     * @param {boolean} enable Input enable
     */
    setInputEnable(enable) {}

    /**
     * Block input
     * @abstract
     * @param {number} code Target code
     */
    blockInput(code) {}

    /**
     * Unblock input
     * @abstract
     * @param {number} code Target code
     */
    unblockInput(code) {}

    /**
     * Press target code
     * @abstract
     * @param {number} code Target code
     */
    press(code) {}

    /**
     * Unpress target code
     * @abstract
     * @param {number} code Target code
     */
    unpress(code) {}

    /**
     * Judge whether pressed now
     * @abstract
     * @param {number} code Target code
     * @return {boolean} whether pressed now
     */
    isPress(code) {}

    /**
     * Judge whether pressed
     * @abstract
     * @param {number} code Target code
     * @return {boolean} whether pressed
     */
    isPressed(code) {}
}

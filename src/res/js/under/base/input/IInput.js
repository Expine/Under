/**
 * Input interface
 * - ### It can get input state
 * - ### It can make input blocked
 * @interface
 * @classdesc Input interface that can get input state and make input blocked
 */
class IInput extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Block input
     * @abstract
     * @param {number} code Target code
     */
    blockInput(code) {}

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

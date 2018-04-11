/**
 * Input interface
 * - ### It can get input state
 * - ### It can make input blocked
 * @classdesc Input interface that can get input state and make input blocked
 */
class IInput extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Block input
     * @interface
     * @param {number} code Target code
     */
    blockInput(code) {}

    /**
     * Judge whether pressed now
     * @interface
     * @param {number} code Target code
     * @return {bool} whether pressed now
     */
    isPress(code) {}

    /**
     * Judge whether pressed
     * @interface
     * @param {number} code Target code
     * @return {bool} whether pressed
     */
    isPressed(code) {}
}

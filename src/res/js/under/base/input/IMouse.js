/**
 * Mouse interface
 * - It can get input state
 * - It can make input blocked
 * - ### Get mouse code
 * - ### Get mouse position
 * @interface
 * @implements {IInput}
 * @classdesc Mouse interface to get mouse code and position
 */
class IMouse extends IInput { // eslint-disable-line  no-unused-vars
    /**
     * Get mouse right code
     * @abstract
     * @return {number} Mouse right code
     */
    mRight() {}
    /**
     * Get mouse left code
     * @abstract
     * @return {number} Mouse left code
     */
    mLeft() {}
    /**
     * Get mouse center code
     * @abstract
     * @return {number} Mouse center code
     */
    mCenter() {}

    /**
     * Get mouse x position
     * @abstract
     * @return mouse x position
     */
    getMouseX() {}

    /**
     * Get mouse x position
     * @abstract
     * @return mouse x position
     */
    getMouseY() {}
}

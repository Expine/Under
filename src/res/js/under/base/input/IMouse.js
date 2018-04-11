/**
 * Mouse interface
 * - It can get input state
 * - It can make input blocked
 * - ### Get mouse code
 * - ### Get mouse position
 * @implements {IInput}
 * @classdesc Mouse interface to get mouse code and position
 */
class IMouse extends IInput { // eslint-disable-line  no-unused-vars
    /**
     * Get mouse right code
     * @interface
     * @return {number} Mouse right code
     */
    mRight() {}
    /**
     * Get mouse left code
     * @interface
     * @return {number} Mouse left code
     */
    mLeft() {}
    /**
     * Get mouse center code
     * @interface
     * @return {number} Mouse center code
     */
    mCenter() {}

    /**
     * Get mouse x position
     * @interface
     * @return mouse x position
     */
    getMouseX() {}

    /**
     * Get mouse x position
     * @interface
     * @return mouse x position
     */
    getMouseY() {}
}

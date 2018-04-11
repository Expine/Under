/**
 * Input system
 * Manages input event including mouse and key
 * Manages input state and provide input state
 * @classdesc Input system for managing input event
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

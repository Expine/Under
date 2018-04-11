/**
 * Input system
 * Manages input event including mouse and key
 * Manages input state and provide input state
 * @classdesc Input system for managing input event
 */
class IKey extends IInput { // eslint-disable-line  no-unused-vars
    /**
     * Get A key code
     * @interface
     * @return {number} A key code
     */
    a() {}
    /**
     * Get 0 key code
     * @interface
     * @return {number} 0 key code
     */
    zero() {}

    /**
     * Get right key code
     * @interface
     * @return {number} Right key code
     */
    right() {}
    /**
     * Get left key code
     * @interface
     * @return {number} Left key code
     */
    left() {}
    /**
     * Get up key code
     * @interface
     * @return {number} Up key code
     */
    up() {}
    /**
     * Get down key code
     * @interface
     * @return {number} Down key code
     */
    down() {}

    /**
     * Get yes key code
     * @interface
     * @return {number} Yes key code
     */
    yes() {}
    /**
     * Get no key code
     * @interface
     * @return {number} No key code
     */
    no() {}
    /**
     * Get sub key code
     * @interface
     * @return {number} Sub key code
     */
    sub() {}
}

/**
 * Key interface
 * - It can get input state
 * - It can make input blocked
 * - ### Gets key code
 * @interface
 * @extends {IInput}
 * @classdesc Key interface to get key code
 */
class IKey extends IInput { // eslint-disable-line  no-unused-vars
    /**
     * Get A key code
     * @abstract
     * @return {number} A key code
     */
    a() {}
    /**
     * Get 0 key code
     * @abstract
     * @return {number} 0 key code
     */
    zero() {}
    /**
     * Get space key code
     * @abstract
     * @return {number} Space key code
     */
    space() {}

    /**
     * Get right key code
     * @abstract
     * @return {number} Right key code
     */
    right() {}
    /**
     * Get left key code
     * @abstract
     * @return {number} Left key code
     */
    left() {}
    /**
     * Get up key code
     * @abstract
     * @return {number} Up key code
     */
    up() {}
    /**
     * Get down key code
     * @abstract
     * @return {number} Down key code
     */
    down() {}

    /**
     * Get yes key code
     * @abstract
     * @return {number} Yes key code
     */
    yes() {}
    /**
     * Get no key code
     * @abstract
     * @return {number} No key code
     */
    no() {}
    /**
     * Get sub key code
     * @abstract
     * @return {number} Sub key code
     */
    sub() {}
}

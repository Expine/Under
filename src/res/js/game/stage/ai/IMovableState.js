/**
 * Movable state interface
 * - ### Sets max velocity and move power for moving
 * @interface
 * @classdesc Movable state interface to set max velocity and move power
 */
class IMovableState extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Get max velocity of x
     * @abstract
     * @return {number} Max velocity of x
     */
    get maxVX() {}

    /**
     * Get max velocity of y
     * @abstract
     * @return {number} Max velocity of y
     */
    get maxVY() {}

    /**
     * Get power of x
     * @abstract
     * @return {number} Power of x
     */
    get movePX() {}

    /**
     * Get power of y
     * @abstract
     * @return {number} Power of y
     */
    get movePY() {}

    /**
     * Set max velocity
     * @abstract
     * @param {number} maxVelocityX The max velocity of x direction
     * @param {number} maxVelocityY The max velocity of y direction
     */
    setMaxVelocity(maxVelocityX, maxVelocityY) {}

    /**
     * Set moving power
     * @abstract
     * @param {number} movePowerX The power of x direction
     * @param {number} movePowerY The power of y direction
     */
    setMovePower(movePowerX, movePowerY) {}
}

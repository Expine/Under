/**
 * Directional imageimage interface
 * - ### Considers the direction
 * @interface
 * @classdesc Directional imageimage interface to consider the direction
 */
class IDirectionalImage extends Interface {
    /**
     * Set direction of image
     * @abstract
     * @param {number} directionX Direction of x
     * @param {number} directionY Direction of y
     */
    setDirection(directionX, directionY) {}
}

/**
 * Prepare state interface
 * - ### Sets the power to be applied and the magnification of the elapsed speed of the preparation time
 * @interface
 * @classdesc Prepare state interface to set the applied power and the magnification of preparation time
 */
class IPrepareState extends Interface {
    /**
     * Set the magnification of the elapsed speed of the preparation time
     * @abstract
     * @param {number} val The magnification of the elapsed speed of the preparation time
     */
    set speedMagnification(val) {}

    /**
     * Set the power to be applied
     * @abstract
     * @param {number} val The power to be applied
     */
    set appliedPower(val) {}

    /**
     * Get the magnification of the elapsed speed of the preparation time
     * @abstract
     * @return {number} The magnification of the elapsed speed of the preparation time
     */
    get speedMagnification() {}

    /**
     * Get the power to be applied
     * @abstract
     * @return {number} The power to be applied
     */
    get appliedPower() {}
}

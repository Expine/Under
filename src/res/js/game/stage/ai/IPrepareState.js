/**
 * Prepare state interface
 * - ### Sets the power to be applied and the magnification of the elapsed speed of the preparation time
 * @classdesc Prepare state interface to set the applied power and the magnification of preparation time
 */
class IPrepareState extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Set the magnification of the elapsed speed of the preparation time
     * @interface
     * @param {number} val The magnification of the elapsed speed of the preparation time
     */
    set speedMagnification(val) {}

    /**
     * Set the power to be applied
     * @interface
     * @param {number} val The power to be applied
     */
    set appliedPower(val) {}

    /**
     * Get the magnification of the elapsed speed of the preparation time
     * @interface
     * @return {number} The magnification of the elapsed speed of the preparation time
     */
    get speedMagnification() {
        return 10;
    }

    /**
     * Get the power to be applied
     * @interface
     * @return {number} The power to be applied
     */
    get appliedPower() {}
}

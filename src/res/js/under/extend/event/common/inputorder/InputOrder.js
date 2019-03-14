/**
 * Input order
 * - ### Indicates order for delegation of input
 * @interface
 * @classdesc Input order to indicate order for delegation of input
 */
class InputOrder {
    /**
     * Initialize input order
     * @abstract
     */
    init() {}

    /**
     * Destructor of input order
     * @abstract
     */
    destruct() {}

    /**
     * Update input order
     * @abstract
     * @param {number} dt Delta time
     * @return {boolean} Whether order is ended or not
     */
    udpate(dt) {}
}

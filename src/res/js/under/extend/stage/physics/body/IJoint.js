/**
 * Joint interface
 * - ### It can joint to something
 * @interface
 * @classdesc Joint interface that can joint to something
 */
class IJoint extends Interface {
    /**
     * Joint to something
     * @abstract
     * @param {Entity} jointed Jointed entity
     * @param {number} jointedX Jointed x position
     * @param {number} jointedY Jointed y position
     * @param {number} length Jointed length
     */
    joint(jointed, jointedX, jointedY, length) {}

    /**
     * Unjoint
     * @abstract
     */
    unjoint() {}
}

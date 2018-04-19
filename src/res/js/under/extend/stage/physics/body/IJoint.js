/**
 * Joint interface
 * - ### It can joint to something
 * @classdesc Joint interface that can joint to something
 */
class IJoint extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Joint to something
     * @interface
     * @param {Entity} jointed Jointed entity
     * @param {number} jointedX Jointed x position
     * @param {number} jointedY Jointed y position
     * @param {number} length Jointed length
     */
    joint(jointed, jointedX, jointedY, length) {}
}

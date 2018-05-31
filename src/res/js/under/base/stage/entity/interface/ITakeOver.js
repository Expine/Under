/**
 * Playable interface
 * - ### Player function interface
 * @interface
 * @classdesc Playable interface for player function
 */
class ITakeOver extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Judged whether it is the same entity to be handed over
     * @abstract
     * @param {Object} target Target element
     * @return {boolean} Whether it is the same entity to be handed over
     */
    equals(target) {}

    /**
     * Take over information
     * @abstract
     * @param {Object} target Target element
     */
    takeOver(target) {}
}

/**
 * Under playable interface
 * - Player function interface
 * - ### Under player function interface
 * @interface
 * @implements {IPlayable}
 * @classdesc Under playable interface for under player function
 */
class IUnderPlayable extends IPlayable {
    /**
     * Change working AI
     * @abstract
     * @param {number} id Terrain ID for changing player type
     * @return {boolean} Whther player is changed or not
     */
    changeType(id) {}
}

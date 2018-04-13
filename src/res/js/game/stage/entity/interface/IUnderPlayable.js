/**
 * Under playable interface
 * - Player function interface
 * - ### Under player function interface
 * @implements {IPlayable}
 * @classdesc Under playable interface for under player function
 */
class IUnderPlayable extends IPlayable { // eslint-disable-line  no-unused-vars
    /**
     * Change working AI
     * @interface
     * @param {number} id Terrain ID for changing player type
     * @return {bool} Whther player is changed or not
     */
    changeType(id) {}
}

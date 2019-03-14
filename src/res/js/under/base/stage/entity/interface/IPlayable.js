/**
 * Playable interface
 * - ### Player function interface
 * @interface
 * @classdesc Playable interface for player function
 */
class IPlayable extends Interface {
    /**
     * Get x position for camera
     * @abstract
     * @return {number} X position for camera
     */
    getCameraX() {}

    /**
     * Get y position for camera
     * @abstract
     * @return {number} y position for camera
     */
    getCameraY() {}

    /**
     * Judge whether game over or not
     * @abstract
     * @return {boolean} whether game over or not
     */
    isGameover() {}
}

/**
 * Playable interface
 * - ### Player function interface
 * @classdesc Playable interface for player function
 */
class IPlayable extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Get x position for camera
     * @interface
     * @return {number} X position for camera
     */
    getCameraX() {}

    /**
     * Get y position for camera
     * @interface
     * @return {number} y position for camera
     */
    getCameraY() {}
}

/**
 * Playable interface
 * - ### Player function interface
 * @interface
 * @classdesc Playable interface for player function
 */
class IPlayable extends Interface { // eslint-disable-line  no-unused-vars
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
}

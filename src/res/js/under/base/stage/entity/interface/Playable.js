/**
 * Playable interface
 * Player function interface
 * @implements {Interface}
 * @classdesc Playable interface for player function
 */
class Playable extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Playable constructor
     * @constructor
     */
    constructor() {
        super();

        this.addMethod(this.getCameraX);
        this.addMethod(this.getCameraY);
    }

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

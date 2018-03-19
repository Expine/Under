/**
 * Camera view class
 * Calculate the area to render
 * @classdesc Camera view abstract class
 */
class Camera { // eslint-disable-line  no-unused-vars
    /**
     * Camera Constructor
     * @constructor
     * @param {number} screenWidth camera screen width
     * @param {number} screenHeight camera screen height
     */
    constructor(screenWidth, screenHeight) {
        /**
         * Camera x position
         * @type {number}
         */
        this.cameraX = 0;
        /**
         * Camera y position
         * @typpe {number}
         */
        this.cameraY = 0;
        /**
         * Camera screen width
         * @type {number}
         */
        this.screenWidth = screenWidth;
        /**
         * Camera screen height
         * @type {number}
         */
        this.screenHeight = screenHeight;
    }

    /**
     * Set camera position
     * @interface
     * @param {number} x base x position
     * @param {number} y base y position
     * @param {number} width camera max width
     * @param {number} height camera max height
     */
    setCameraPosition(x, y, width, height) {}
}

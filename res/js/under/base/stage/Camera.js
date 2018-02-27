/**
 * Camera view class
 * @classdesc Camera view abstract class
 */
class Camera {
    /**
     * Constructor for camera
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
         * Screen width
         * @type {number}
         */
        this.screenWidth = screenWidth;
        /**
         * Screen height
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
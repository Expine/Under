/**
 * Camera view class
 * @classdesc Camera view abstract class
 */
class Camera {
    /**
     * Constructor for camera
     * @constructor
     */
    constructor(screenWidth, screenHeight) {
        /**
         * Camera x position
         * @type {number}
         */
        this.cameraX = 0;
        /**
         * Camera y position
         * @type {number}
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
     * @param {number} x base x position
     * @param {number} y base y position
     * @param {number} width camera max width
     * @param {number} height camera max height
     */
    setCameraPosition(x, y, width, height) {
        this.cameraX = this.screenWidth / 2 - x;
        this.cameraY = this.screenHeight / 2 - y;
        if (this.cameraX > 0)
            this.cameraX = 0;
        else if (this.cameraX < this.screenWidth - width)
            this.cameraX = this.screenWidth - width;
        if (this.cameraY < 0)
            this.cameraY = 0;
        else if (this.cameraY > height - this.screenHeight)
            this.cameraY = height - this.screenHeight;
    }
}
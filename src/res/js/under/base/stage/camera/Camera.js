/**
 * Camera
 * - ### Calculates the area to rendering
 * @classdesc Camera to calculate the area of rendering
 */
class Camera { // eslint-disable-line  no-unused-vars
    /**
     * Camera Constructor
     * @constructor
     * @param {number} screenWidth Camera screen width
     * @param {number} screenHeight Camera screen height
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
         * Camera base x position
         * @type {number}
         */
        this.baseX = 0;
        /**
         * Camera base y position
         * @type {number}
         */
        this.baseY = 0;
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
     * @param {number} x Base x position
     * @param {number} y Base y position
     * @param {number} width Camera max width
     * @param {number} height Camera max height
     */
    setCameraPosition(x, y, width, height) {}
}

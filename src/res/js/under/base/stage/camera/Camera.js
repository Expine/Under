/**
 * Camera
 * - ### Calculates the area to rendering
 * @interface
 * @classdesc Camera to calculate the area of rendering
 */
class Camera { // eslint-disable-line  no-unused-vars
    /**
     * Camera Constructor
     * @constructor
     */
    constructor() {
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
        this.screenWidth = 0;
        /**
         * Camera screen height
         * @type {number}
         */
        this.screenHeight = 0;
    }

    /**
     * Set screen size
     * @param {number} screenWidth Camera screen width
     * @param {number} screenHeight Camera screen height
     */
    setScreenSize(screenWidth, screenHeight) {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
    }

    /**
     * Set camera position
     * @abstract
     * @param {number} x Base x position
     * @param {number} y Base y position
     * @param {number} width Camera max width
     * @param {number} height Camera max height
     */
    setCameraPosition(x, y, width, height) {}
}

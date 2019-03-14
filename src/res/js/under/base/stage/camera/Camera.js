/**
 * Camera
 * - ### Calculates the area to rendering
 * @interface
 * @classdesc Camera to calculate the area of rendering
 */
class Camera {
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

        /**
         * Camera max width
         * @protected
         * @type {number}
         */
        this.maxWidth = 0;
        /**
         * Camera max height
         * @protected
         * @type {number}
         */
        this.maxHeight = 0;
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
     * Set camera max size
     * @param {number} maxWidth Camera max width
     * @param {number} maxHeight Cmera max height
     */
    setMaxSize(maxWidth, maxHeight) {
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
    }

    /**
     * Initialize camera
     * @abstract
     * @param {number} x First camera x position
     * @param {number} y First camera y position
     */
    init(x, y) {}

    /**
     * Update camera
     * @abstract
     * @param {number} x Base x position
     * @param {number} y Base y position
     * @param {number} dt Delta time
     */
    update(x, y, dt) {}
}

/**
 * Moving center camera
 * - Calculates the area to rendering
 * - ### Move gradually, not instantaneously
 * @extends {Camera}
 * @classdesc Moving center camera to move gradually, not instantaneously
 */
class MovingCamera extends Camera { // eslint-disable-line  no-unused-vars
    /**
     * Moving Camera Constructor
     * @constructor
     * @param {Camera} baseCamera Base camera for delegation
     */
    constructor(baseCamera) {
        super();

        /**
         * Base camera for delegation
         * @protected
         * @type {Camera}
         */
        this.baseCamera = baseCamera;
    }


    /**
     * Set screen size
     * @override
     * @param {number} screenWidth Camera screen width
     * @param {number} screenHeight Camera screen height
     */
    setScreenSize(screenWidth, screenHeight) {
        super.setScreenSize(screenWidth, screenHeight);
        this.baseCamera.setScreenSize(screenWidth, screenHeight);
    }

    /**
     * Set camera position
     * @param {number} x Base x position
     * @param {number} y Base y position
     * @param {number} width Camera max width
     * @param {number} height Camera max height
     */
    setCameraPosition(x, y, width, height) {
        // set position
        this.baseCamera.setCameraPosition(x, y, width, height);

        // move gradually
        if (this.cameraX != this.baseCamera.cameraX || this.cameraY != this.baseCamera.cameraY) {
            this.cameraX = this.cameraX + (this.baseCamera.cameraX - this.cameraX) / 7;
            this.cameraY = this.cameraY + (this.baseCamera.cameraY - this.cameraY) / 7;
        }
        this.screenWidth = this.baseCamera.screenWidth;
        this.screenHeight = this.baseCamera.screenHeight;
    }
}

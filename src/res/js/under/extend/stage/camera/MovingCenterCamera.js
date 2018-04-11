/**
 * Moving center camera
 * - Calculates the area to rendering
 * - Centering at the indicated coordinates
 * - ### Move gradually, not instantaneously
 * @extends {CenterCamera}
 * @classdesc Moving center camera to move gradually, not instantaneously
 */
class MovingCenterCamera extends CenterCamera { // eslint-disable-line  no-unused-vars
    /**
     * Moving center camera Constructor
     * @constructor
     * @param {number} screenWidth Camera screen width
     * @param {number} screenHeight Camera screen height
     */
    constructor(screenWidth, screenHeight) {
        super(screenWidth, screenHeight);

        /**
         * Camera x position to which move
         * @protected
         * @type {number}
         */
        this.moveToX = this.cameraX;
        /**
         * Camera y position to which move
         * @protected
         * @type {number}
         */
        this.moveToY = this.cameraY;
    }

    /**
     * Set camera position
     * @param {number} x Base x position
     * @param {number} y Base y position
     * @param {number} width Camera max width
     * @param {number} height Camera max height
     */
    setCameraPosition(x, y, width, height) {
        // save
        let preX = this.cameraX;
        let preY = this.cameraY;

        super.setCameraPosition(x, y, width, height);

        if (this.moveToX != this.cameraX || this.moveToY != this.cameraY) {
            this.cameraX = preX + (this.cameraX - preX) / 10;
            this.cameraY = preY + (this.cameraY - preY) / 10;
        }
    }
}

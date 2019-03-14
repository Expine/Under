/**
 * Movement background
 * - Renders and update backgrdoun image
 * - Manages image as background
 * - ### Moves relatively
 * @extends {ImageBackground}
 * @classdesc Movement background to move relatively
 */
class MovementBackground extends ImageBackground {
    /**
     * Movement background constructor
     * @constructor
     * @param {GameImage} backImage Background image
     * @param {number} x Background x position
     * @param {number} y Background x position
     * @param {number} speedRatioX Ratio of speed of x velocity
     * @param {number} speedRatioY Ratio of speed of y velocity
     */
    constructor(backImage, x, y, speedRatioX, speedRatioY) {
        super(backImage);

        /**
         * Background x position
         * @protected
         * @type {number}
         */
        this.x = x;
        /**
         * Background y position
         * @protected
         * @type {number}
         */
        this.y = y;
        /**
         * Ratio of speed of x velocity
         * @protected
         * @type {number}
         */
        this.speedRatioX = speedRatioX;
        /**
         * Ratio of speed of y velocity
         * @protected
         * @type {number}
         */
        this.speedRatioY = speedRatioY;
    }

    /**
     * Render background
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     * @param {number} screenWidth Scren width
     * @param {number} screenWidth Scren height
     */
    render(ctx, shiftX, shiftY, screenWidth, screenHeight) {
        this.backImage.render(ctx, this.x + shiftX * this.speedRatioX, this.y + shiftY * this.speedRatioY);
    }
}

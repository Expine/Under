/**
 * Fixed background
 * - Renders and update backgrdoun image
 * - Manages image as background
 * - ### Background that is fixed to certain coordinates
 * @extends {ImageBackground}
 * @classdesc Fixed background that is fixed to certain coordinates
 */
class FixedBackground extends ImageBackground { // eslint-disable-line  no-unused-vars
    /**
     * Fixed background constructor
     * @constructor
     * @param {GameImage} backImage Background image
     * @param {number} x Background x position
     * @param {number} y Background x position
     */
    constructor(backImage, x, y) {
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
        this.backImage.render(ctx, this.x + shiftX, this.y + shiftY);
    }
}

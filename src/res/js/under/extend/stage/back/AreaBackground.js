/**
 * Movement background
 * - Renders and update backgrdoun image
 * - Manages image as background
 * - ### Renders certain area
 * @extends {ImageBackground}
 * @classdesc Movement background to render certain area
 */
class AreaBackground extends ImageBackground { // eslint-disable-line  no-unused-vars
    /**
     * Movement background constructor
     * @constructor
     * @param {GameImage} backImage Background image
     * @param {number} x Background x position
     * @param {number} y Background x position
     * @param {number} areaWidth Renderign area width
     * @param {number} areaHeight Rendering area height
     */
    constructor(backImage, x, y, areaWidth, areaHeight) {
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
         * Renderign area width
         * @protected
         * @type {number}
         */
        this.areaWidth = areaWidth;
        /**
         * Renderign area height
         * @protected
         * @type {number}
         */
        this.areaHeight = areaHeight;
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
        let x = -shiftX - this.x;
        let y = -shiftY - this.y;
        let width = this.backImage.getWidth();
        let height = this.backImage.getHeight();
        if (x <= 0) {
            x = this.x + shiftX;
        } else if (this.areaWidth - screenWidth <= -shiftX - this.x) {
            x = this.x + shiftX - width + this.areaWidth;
        } else {
            x = -(screenWidth - width) / (this.areaWidth - screenWidth) * (shiftX + this.x);
        }
        if (y <= 0) {
            y = this.y + shiftY;
        } else if (this.areaHeight - screenHeight <= -shiftY - this.y) {
            y = this.y + shiftY - height + this.areaHeight;
        } else {
            y = -(screenHeight - height) / (this.areaHeight - screenHeight) * (shiftY + this.y);
        }
        this.backImage.render(ctx, x, y);
    }
}

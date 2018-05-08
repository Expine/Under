/**
 * Movement background
 * - Renders and update backgrdoun image
 * - ### Moves relatively
 * @implements {Background}
 * @classdesc Movement background to move relatively
 */
class MovementBackground extends Background { // eslint-disable-line  no-unused-vars
    /**
     * Movement background constructor
     * @constructor
     * @param {number} backID Background image id
     * @param {number} x Background x position
     * @param {number} y Background x position
     * @param {number} width Background width
     * @param {number} height Background height
     * @param {number} speedRatioX Ratio of speed of x velocity
     * @param {number} speedRatioY Ratio of speed of y velocity
     */
    constructor(backID, x, y, width, height, speedRatioX, speedRatioY) {
        super();

        /**
         * Background image id
         * @protected
         * @type {number}
         */
        this.backID = backID;

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
         * Background width
         * @protected
         * @type {number}
         */
        this.width = width;
        /**
         * Background height
         * @protected
         * @type {number}
         */
        this.height = height;
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
        ctx.drawImage(this.backID, this.x + shiftX * this.speedRatioX, this.y + shiftY * this.speedRatioY, this.width, this.height);
    }
}

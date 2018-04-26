/**
 * Movement map
 * - Renders and update backgrdoun image
 * - ### Moves relatively
 * @implements {Map}
 * @classdesc Movement map to move relatively
 */
class MovementMap extends Map { // eslint-disable-line  no-unused-vars
    /**
     * Movement map constructor
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
     * Get back image ID
     * @override
     * @return {number} Back image ID
     */
    getBackID() {
        return this.backID;
    }

    /**
     * Render map
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        ctx.drawImage(this.backID, this.x + shiftX * this.speedRatioX, this.y + shiftY * this.speedRatioY, this.width, this.height);
    }
}

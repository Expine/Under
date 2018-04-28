/**
 * Fixed map
 * - Renders and update backgrdoun image
 * - ### Map that is fixed to certain coordinates
 * @implements {Map}
 * @classdesc Fixed map that is fixed to certain coordinates
 */
class FixedBackMap extends Map { // eslint-disable-line  no-unused-vars
    /**
     * Fixed map constructor
     * @constructor
     * @param {number} backID Background image id
     * @param {number} x Background x position
     * @param {number} y Background x position
     * @param {number} width Background width
     * @param {number} height Background height
     */
    constructor(backID, x, y, width, height) {
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
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     * @param {number} screenWidth Scren width
     * @param {number} screenWidth Scren height
     */
    render(ctx, shiftX, shiftY, screenWidth, screenHeight) {
        ctx.drawImage(this.backID, this.x + shiftX, this.y + shiftY, this.width, this.height);
    }
}

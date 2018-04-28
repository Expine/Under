/**
 * Movement map
 * - Renders and update backgrdoun image
 * - ### Renders certain area
 * @implements {Map}
 * @classdesc Movement map to render certain area
 */
class AreaMap extends Map { // eslint-disable-line  no-unused-vars
    /**
     * Movement map constructor
     * @constructor
     * @param {number} backID Background image id
     * @param {number} x Background x position
     * @param {number} y Background x position
     * @param {number} width Background width
     * @param {number} height Background height
     * @param {number} areaWidth Renderign area width
     * @param {number} areaHeight Rendering area height
     */
    constructor(backID, x, y, width, height, areaWidth, areaHeight) {
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
        let x = -shiftX - this.x;
        let y = -shiftY - this.y;
        if (x <= 0) {
            x = this.x + shiftX;
        } else if (this.areaWidth - screenWidth <= -shiftX - this.x) {
            x = this.x + shiftX - this.width + this.areaWidth;
        } else {
            x = -(screenWidth - this.width) / (this.areaWidth - screenWidth) * (shiftX + this.x);
        }
        if (y <= 0) {
            y = this.y + shiftY;
        } else if (this.areaHeight - screenHeight <= -shiftY - this.y) {
            y = this.y + shiftY - this.height + this.areaHeight;
        } else {
            y = -(screenHeight - this.height) / (this.areaHeight - screenHeight) * (shiftY + this.y);
        }
        ctx.drawImage(this.backID, x, y, this.width, this.height);
    }
}

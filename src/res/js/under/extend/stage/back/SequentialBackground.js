/**
 * Sequential background
 * - Renders and update backgrdoun image
 * - ### Processes continuously
 * @implements {Background}
 * @classdesc Sequential background to process continuously
 */
class SequentialBackground extends Background { // eslint-disable-line  no-unused-vars
    /**
     * Sequential background constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * List of backgrounds to process consecutively
         * @protected
         * @type {Array<Background>}
         */
        this.backs = [];
    }

    /**
     * Add background to list
     * @param {Background} back Background
     */
    addBackground(back) {
        this.backs.push(back);
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
        for (let back of this.backs) {
            back.render(ctx, shiftX, shiftY, screenWidth, screenHeight);
        }
    }
}

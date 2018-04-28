/**
 * Invariant back map
 * - Renders and update backgrdoun image
 * - ### Map where the background does not move
 * @implements {Map}
 * @classdesc Invariant back map where the background does not move
 */
class InvariantBackMap extends Map { // eslint-disable-line  no-unused-vars
    /**
     * Invariant back map constructor
     * @constructor
     * @param {number} backID Background image id
     */
    constructor(backID) {
        super();

        /**
         * Background image id
         * @protected
         * @type {number}
         */
        this.backID = backID;
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
        ctx.drawImage(this.backID, 0, 0);
    }
}

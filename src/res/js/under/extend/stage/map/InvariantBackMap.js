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
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        ctx.drawImage(this.backID, 0, 0);
    }
}

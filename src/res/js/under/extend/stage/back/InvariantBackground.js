/**
 * Invariant background
 * - Renders and update backgrdoun image
 * - Manages image as background
 * - ### Background where the background does not move
 * @extends {ImageBackground}
 * @classdesc Invariant background where the background does not move
 */
class InvariantBackground extends ImageBackground { // eslint-disable-line  no-unused-vars
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
        this.backImage.render(ctx, 0, 0);
    }
}

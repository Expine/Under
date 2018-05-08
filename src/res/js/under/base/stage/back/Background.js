/**
 * Background
 * - ### Renders and update backgrdoun image
 * @interface
 * @classdesc Background to render and update background image
 */
class Background { // eslint-disable-line  no-unused-vars
    /**
     * Update background
     * @abstract
     * @param {number} dt delta time
     */
    update(dt) {}

    /**
     * Render background
     * @abstract
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     * @param {number} screenWidth Scren width
     * @param {number} screenWidth Scren height
     */
    render(ctx, shiftX, shiftY, screenWidth, screenHeight) {}
}

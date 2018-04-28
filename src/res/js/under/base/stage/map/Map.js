/**
 * Map
 * - ### Renders and update backgrdoun image
 * @interface
 * @classdesc Map to render and update background image
 */
class Map { // eslint-disable-line  no-unused-vars
    /**
     * Get back image ID
     * @abstract
     * @return {number} Back image ID
     */
    getBackID() {}

    /**
     * Update map
     * @abstract
     * @param {number} dt delta time
     */
    update(dt) {}

    /**
     * Render map
     * @abstract
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     * @param {number} screenWidth Scren width
     * @param {number} screenWidth Scren height
     */
    render(ctx, shiftX, shiftY, screenWidth, screenHeight) {}
}

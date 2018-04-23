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
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {}
}

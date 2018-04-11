/**
 * Layer
 * - ### Performs drawing processing collectively
 * @classdesc Layer to perform drawing processing collectively
 */
class Layer { // eslint-disable-line  no-unused-vars
    /**
     * Update layer
     * @interface
     * @param {number} dt Delta time
     */
    update(dt) {}

    /**
     * Render layer
     * @interface
     * @param {Context} ctx Canvas context
     */
    render(ctx) {}
}

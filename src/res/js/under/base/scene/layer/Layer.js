/**
 * Layer
 * - ### Performs drawing processing collectively
 * @interface
 * @classdesc Layer to perform drawing processing collectively
 */
class Layer { // eslint-disable-line  no-unused-vars
    /**
     * Initialize scene
     * @abstract
     */
    init() {}

    /**
     * Update layer
     * @abstract
     * @param {number} dt Delta time
     */
    update(dt) {}

    /**
     * Render layer
     * @abstract
     * @param {Context} ctx Canvas context
     */
    render(ctx) {}
}

/**
 * Scene
 * - ### Controls updating and rendering
 * @interface
 * @classdesc Scene to control updating and rendering
 */
class Scene { // eslint-disable-line  no-unused-vars
    /**
     * Initialize scene
     * @abstract
     */
    init() {}

    /**
     * Update scene
     * @abstract
     * @param {number} dt Delta time
     */
    update(dt) {}

    /**
     * Render scene
     * @abstract
     * @param {Context} ctx Canvas context
     */
    render(ctx) {}
}

/**
 * Scene
 * - ### Controls updating and rendering
 * @classdesc Scene to control updating and rendering
 */
class Scene { // eslint-disable-line  no-unused-vars
    /**
     * Initialize scene
     * @interface
     */
    init() {}

    /**
     * Update scene
     * @interface
     * @param {number} dt Delta time
     */
    update(dt) {}

    /**
     * Render scene
     * @interface
     * @param {Context} ctx Canvas context
     */
    render(ctx) {}
}

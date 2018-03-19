/**
 * Game scene class
 * Controls updating and rendering
 * @classdesc Scene base class to control updating and rendering
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
     * @param {number} dt - delta time
     */
    update(dt) {}

    /**
     * Render scene
     * @interface
     * @param {Context} ctx
     */
    render(ctx) {}
}

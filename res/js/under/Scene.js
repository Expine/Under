/**
 * Scene
 * Game scene base class for extension
 * @classdesc Scene base class
 */
class Scene {
    /**
     * Render scene
     * @interface
     * @param {CanvasRenderingContext2D} ctx
     */
    render(ctx) {}

    /**
     * Update scene
     * @interface
     * @param {number} dt - delta time
     */
    update(dt) {}

    /**
     * Set input system
     * @param {Input} input - input system
     */
    setInput(input) {
        /**
         * Input system
         * @protected
         * @type {Input}
         */
        this.input = input;
    }
}
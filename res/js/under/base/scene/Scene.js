/**
 * Game scene class
 * Controls updating and rendering
 * @classdesc Scene base class to control updating and rendering
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

    /**
     * Set scene manager
     * @param {SceneManager} manager Scene manager
     */
    setSceneManager(manager) {
        /**
         * Scene manager
         * @protected
         * @type {SceneManager}
         */
        this.manager = manager;
    }
}
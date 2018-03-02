/**
 * Game scene class
 * Controls updating and rendering
 * @classdesc Scene base class to control updating and rendering
 */
class Scene { // eslint-disable-line  no-unused-vars
    /**
     * Render scene
     * @interface
     * @param {Context} ctx
     */
    render(ctx) {}

    /**
     * Update scene
     * @interface
     * @param {number} dt - delta time
     */
    update(dt) {}

    /**
     * Start scene
     * @interface
     */
    start() {}

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
     * @param {SceneManager} scene Scene manager
     */
    setSceneManager(scene) {
        /**
         * Scene manager
         * @protected
         * @type {SceneManager}
         */
        this.scene = scene;
    }
}

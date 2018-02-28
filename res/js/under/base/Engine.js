/**
 * Control the core of the game
 * Manages each piece of game information
 * Fires update and rendering processing respectively
 * @classdesc Control the core of the game
 */
class Engine {
    /**
     * Set input system
     * @param {Input} input Input system
     */
    setInput(input) {
        /**
         * Input system instance
         * @protected
         * @type {Input}
         */
        this.input = input;
    }

    /**
     * Set screen system
     * @param {Screen} screen Screen system
     */
    setScreen(screen) {
        /**
         * Screen information
         * @protected
         * @type {Screen}
         */
        this.screen = screen;
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

    /**
     * Execute engine
     * @interface
     * @param {Scene} scene First scene
     */
    execute(scene) {}
}
/**
 * Control the core of the game
 * Manages each piece of game information
 * Fires update and rendering processing respectively
 * @classdesc Control the core of the game
 */
class Engine { // eslint-disable-line  no-unused-vars
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
         * Screen system
         * @protected
         * @type {Screen}
         */
        this.screen = screen;
    }

    /**
     * Set context to render
     * @param {Context} context Context to render
     */
    setContext(context) {
        /**
         * Context tp render
         * @protected
         * @type {Context}
         */
        this.context = context;
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
    execute(scene) {
        // set access
        this.manager.setInput(this.input);
        this.input.setScreen(this.screen);
        this.context.setScreen(this.screen);
    }
}

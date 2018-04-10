/**
 * Engine builder
 * - ### Performs initial construction of the game engine
 * @classdesc Engine builder to perform initial construction of the game engine
 */
class EngineBuilder { // eslint-disable-line  no-unused-vars
    /**
     * Make game engine
     * @interface
     * @protected
     * @return {Engine} Game engine
     */
    makeEngine() {}

    /**
     * Make input system
     * @interface
     * @protected
     * @return {Input} Input system
     */
    makeInput() {}

    /**
     * Make screen system
     * @interface
     * @protected
     * @return {Screen} Screen system
     */
    makeScreen() {}

    /**
     * Make context to render
     * @interface
     * @protected
     * @return {Context} Context to render
     */
    makeContext() {}

    /**
     * Make music system
     * @interface
     * @protected
     * @return {Music} Music system
     */
    makeMusic() {}

    /**
     * Make timer
     * @interface
     * @protected
     * @return {Timer} Timer
     */
    makeTimer() {}

    /**
     * Make scene manager
     * @interface
     * @protected
     * @return {SceneManager} Scene manager
     */
    makeSceneManager() {}

    /**
     * Perform initial construction of the game engine
     * @return {Engine} Game engine
     */
    build() {
        let engine = this.makeEngine();
        engine.setInput(this.makeInput());
        engine.setScreen(this.makeScreen());
        engine.setContext(this.makeContext());
        engine.setMusic(this.makeMusic());
        engine.setSceneManager(this.makeSceneManager());
        engine.setTimer(this.makeTimer());
        return engine;
    }
}

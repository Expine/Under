/**
 * Engine builder
 * - ### Performs initial construction of the game engine
 * @interface
 * @classdesc Engine builder to perform initial construction of the game engine
 */
class EngineBuilder { // eslint-disable-line  no-unused-vars
    /**
     * Make game engine
     * @abstract
     * @protected
     * @return {Engine} Game engine
     */
    makeEngine() {}

    /**
     * Make input system
     * @abstract
     * @protected
     * @return {Input} Input system
     */
    makeInput() {}

    /**
     * Make screen system
     * @abstract
     * @protected
     * @return {GameScreen} Screen system
     */
    makeScreen() {}

    /**
     * Make context to render
     * @abstract
     * @protected
     * @return {Context} Context to render
     */
    makeContext() {}

    /**
     * Make image manager
     * @abstract
     * @protected
     * @return {IImageManager} Image manager
     */
    makeImageManager() {}

    /**
     * Make music system
     * @abstract
     * @protected
     * @return {Music} Music system
     */
    makeMusic() {}

    /**
     * Make music manager
     * @abstract
     * @protected
     * @return {IMusicManager} Music manager
     */
    makeMusicManager() {}

    /**
     * Make timer
     * @abstract
     * @protected
     * @return {Timer} Timer
     */
    makeTimer() {}

    /**
     * Make scene manager
     * @abstract
     * @protected
     * @return {SceneManager} Scene manager
     */
    makeSceneManager() {}

    /**
     * Make event manager
     * @abstract
     * @protected
     * @return {EventManager} Event manager
     */
    makeEventManager() {}

    /**
     * Perform initial construction of the game engine
     * @return {Engine} Game engine
     */
    build() {
        let engine = this.makeEngine();
        engine.setInput(this.makeInput());
        engine.setScreen(this.makeScreen());
        // set context
        let context = this.makeContext();
        context.setImageManager(this.makeImageManager());
        engine.setContext(context);
        // set music
        let music = this.makeMusic();
        music.setMusicManager(this.makeMusicManager());
        engine.setMusic(music);
        engine.setSceneManager(this.makeSceneManager());
        engine.setEventManager(this.makeEventManager());
        engine.setTimer(this.makeTimer());
        return engine;
    }
}

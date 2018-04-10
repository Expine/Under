/**
 * Under engine builder
 * - Performs initial construction of the game engine
 * - ### Generates all necessary instances
 * @implements {EngineBuilder}
 * @classdesc Under engine builder to perform initial construction of the game engine
 */
class UnderEngineBuilder extends EngineBuilder { // eslint-disable-line  no-unused-vars
    /**
     * Make game engine
     * @override
     * @protected
     * @return {Engine} Game engine
     */
    makeEngine() {
        return Engine.debug ? new UnderDebugEngine() : new UnderEngine();
    }

    /**
     * Make input system
     * @override
     * @protected
     * @return {Input} Input system
     */
    makeInput() {
        return new AllInput();
    }

    /**
     * Make screen system
     * @override
     * @protected
     * @return {Screen} Screen system
     */
    makeScreen() {
        return new ScalableScreen();
    }

    /**
     * Make context to render
     * @override
     * @protected
     * @return {Context} Context to render
     */
    makeContext() {
        let context = new JSContext();
        context.setContextImage(new CachedImage(`src/res/image/`));
        return context;
    }

    /**
     * Make music system
     * @override
     * @protected
     * @return {Music} Music system
     */
    makeMusic() {
        return new XHTMLMusic();
    }

    /**
     * Make timer
     * @override
     * @protected
     * @return {Timer} Timer
     */
    makeTimer() {
        return new SimpleTimer();
    }

    /**
     * Make scene manager
     * @override
     * @protected
     * @return {SceneManager} Scene manager
     */
    makeSceneManager() {
        return new StackSceneManager();
    }
}

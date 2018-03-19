/**
 * Under engine builder
 * Performs initial construction of the game engine
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
        return new UnderEngine();
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
     * @return {Screen} Context to render
     */
    makeContext() {
        let context = new JSContext();
        context.setContextImage(new CachedImage());
        return context;
    }

    /**
     * Make music system
     * @override
     * @protected
     * @return {Screen} Music system
     */
    makeMusic() {
        return new XHTMLMusic();
    }

    /**
     * Make scene manager
     * @override
     * @protected
     * @return {Screen} Scene manager
     */
    makeSceneManager() {
        return new StackSceneManager();
    }
}

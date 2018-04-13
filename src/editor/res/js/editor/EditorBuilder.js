/**
 * Editor engine builder
 * - Performs initial construction of the game engine
 * - Generates all necessary instances
 * - ### Generates instance related to editor
 * @extends {UnderEngineBuilder}
 * @classdesc Editor engine builder to generate instance related to editor
 */
class EditorBuilder extends UnderEngineBuilder { // eslint-disable-line  no-unused-vars
    /**
     * Make screen system
     * @override
     * @protected
     * @return {Screen} Screen system
     */
    makeScreen() {
        return new FitableScreen(800, 850);
    }

    /**
     * Make input system
     * @override
     * @protected
     * @return {Input} Input system
     */
    makeInput() {
        return new AllInput(new KeyInput(), new MouseInput());
    }

    /**
     * Make context to render
     * @override
     * @protected
     * @return {Context} Context to render
     */
    makeContext() {
        return new EditorContext();
    }
}

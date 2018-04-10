/**
 * Editor engine builder
 * Performs initial construction of the edtiro
 * @extends {UnderEngineBuilder}
 * @classdesc Editor engine builder to perform initial construction of the editor
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
     * Make context to render
     * @override
     * @protected
     * @return {Screen} Context to render
     */
    makeContext() {
        let context = new EditorContext();
        context.setContextImage(new CachedImage(`src/res/image/`));
        return context;
    }
}

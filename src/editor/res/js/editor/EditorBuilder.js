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
        return new EditorScreen(800, 850);
    }
}

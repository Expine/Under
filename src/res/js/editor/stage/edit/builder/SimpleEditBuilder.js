/**
 * Edit builder
 * - Generates edit tools
 * - ### Generate simple editor tools
 * @extends {EditBuilder}
 * @classdesc Edit builder to generate simple editor tools
 */
class SimpleEditBuilder extends EditBuilder { // eslint-disable-line  no-unused-vars
    /**
     * Generates image
     * @protected
     * @param {sring} imgae Image name
     * @return {GameImage} Generated image
     */
    makeImage(image) {
        return new SingleImage(ResourceManager.image.load(`editor/${image}`), 16, 16);
    }

    /**
     * Generates tools
     * @protected
     * @param {EditorBase} base Editor base
     */
    makeTools(base) {
        base.addTool(`pencil`, new PencilTool(this.makeImage(`pencil.png`), Input.key.zero() + 1));
        base.addTool(`eraser`, new EraserTool(this.makeImage(`eraser.png`), Input.key.zero() + 2));
        base.addTool(`syringe`, new SyringeTool(null));
        base.addTool(`paint`, new PaintTool(this.makeImage(`paint.png`), Input.key.zero() + 3));
        base.addTool(`tile`, new AutoTileTool(this.makeImage(`tile.png`), Input.key.zero() + 4));
    }

    /**
     * Generate editor base
     * @protected
     * @return {EditorBase} Editor base
     */
    makeEditorBase() {
        return new SimpleEditor();
    }

    /**
     * Build entity from json data
     * @override
     * @return {EditorBase} Generated edit tool
     */
    build() {
        let ret = this.makeEditorBase();
        this.makeTools(ret);
        return ret;
    }
}

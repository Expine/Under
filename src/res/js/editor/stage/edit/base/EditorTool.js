/**
 * Editor tool
 * - ### Tool for editing
 * @interface
 * @classdesc Editor tool for editing
 */
class EditorTool {
    /**
     * Editor tool constructor
     * @constructor
     */
    constructor() {
        /**
         * Target for editing
         * @protected
         * @type {IEditorFunction}
         */
        this.editor = null;
    }

    /**
     * Set edtor for operating
     * @param {IEditorFunction} editor Editor for operating
     */
    setEditor(editor) {
        this.editor = editor;
    }

    /**
     * Initialize tool
     * @abstract
     */
    init() {}

    /**
     * Update tool
     * @abstract
     * @param {number} x Target x position
     * @param {number} y Target y position
     * @param {number} dt Delta time
     */
    update(x, y, dt) {}

    /**
     * Use tool by ID
     * @abstract
     * @param {number} x Target x position
     * @param {number} y Target y position
     * @param {number} id Painting ID
     */
    use(x, y, id) {}

    /**
     * Render tool
     * @abstract
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {}
}

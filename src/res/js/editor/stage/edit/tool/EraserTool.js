/**
 * Pencil tool
 * - Tool for editing
 * - Selects something
 * - ### Erases
 * @extends {BaseTool}
 * @classdesc Pencil tool to erase
 */
class EraserTool extends BaseTool {
    /**
     * Shortcut for switching
     * @override
     * @protected
     */
    shortcut() {
        this.editor.setCurrentID(-1);
        this.editor.changeTool(`eraser`);
    }

    /**
     * Use tool by ID
     * @override
     * @param {number} x Target x position
     * @param {number} y Target y position
     * @param {number} id Painting ID
     */
    use(x, y, id) {
        super.use(x, y, id);
        if (Input.mouse.isPressed(Input.mouse.mLeft())) {
            this.editor.getTarget().paint(this.selectedX, this.selectedY, -1);
        }
        if (id !== -1) {
            this.editor.changeTool(`pencil`);
        }
    }
}

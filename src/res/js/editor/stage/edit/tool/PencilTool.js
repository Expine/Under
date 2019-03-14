/**
 * Pencil tool
 * - Tool for editing
 * - Selects something
 * - ### Paints one by one
 * @extends {BaseTool}
 * @classdesc Pencil tool to paint one by one
 */
class PencilTool extends BaseTool {

    /**
     * Shortcut for switching
     * @override
     * @protected
     */
    shortcut() {
        // swicth pencil
        if (this.editor.getCurrentID() < 0) {
            this.editor.setCurrentID(0);
        }
        this.editor.changeTool(`pencil`);
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
        if (id >= 0 && Input.mouse.isPressed(Input.mouse.mLeft())) {
            this.editor.getTarget().paint(this.selectedX, this.selectedY, id);
        }
        if (id === -1) {
            this.editor.changeTool(`eraser`);
        }
    }
}

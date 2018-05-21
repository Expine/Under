/**
 * Pencil tool
 * - Tool for editing
 * - Selects something
 * - ### Paints area
 * @extends {BaseTool}
 * @classdesc Pencil tool to paint area
 */
class PaintTool extends BaseTool { // eslint-disable-line  no-unused-vars
    /**
     * Paints area
     * @protected
     * @param {number} x Target x position
     * @param {number} y Target y position
     * @param {number} id Painting ID
     * @param {number} preID Previous ID
     */
    paint(x, y, id, preID) {
        this.editor.getTarget().paint(x, y, id);
        let right = this.editor.getTarget().getEditorEntity(x + 32, y);
        if (right !== null && right.getID() === preID) {
            this.paint(x + 32, y, id, preID);
        }
        let left = this.editor.getTarget().getEditorEntity(x - 32, y);
        if (left !== null && left.getID() === preID) {
            this.paint(x - 32, y, id, preID);
        }
        let under = this.editor.getTarget().getEditorEntity(x, y + 32);
        if (under !== null && under.getID() === preID) {
            this.paint(x, y + 32, id, preID);
        }
        let top = this.editor.getTarget().getEditorEntity(x, y - 32);
        if (top !== null && top.getID() === preID) {
            this.paint(x, y - 32, id, preID);
        }
    }

    /**
     * Update tool
     * @override
     * @protected
     */
    shortcut() {
        this.editor.changeTool(`paint`);
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
            let pre = this.editor.getTarget().getEditorEntity(this.selectedX, this.selectedY);
            let preID = pre === null ? -1 : pre.getID();
            this.paint(this.selectedX, this.selectedY, id, preID);
        }
    }
}

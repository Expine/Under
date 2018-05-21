/**
 * Syringe tool
 * - Tool for editing
 * - ### Extracts entity
 * @extends {EditorTool}
 * @classdesc Syringe tool to extract entity
 */
class SyringeTool extends EditorTool { // eslint-disable-line  no-unused-vars
    /**
     * Update tool
     * @override
     * @param {number} x Target x position
     * @param {number} y Target y position
     * @param {number} dt Delta time
     */
    update(x, y, dt) {
        this.selectedX = Math.floor(x / 32) * 32;
        this.selectedY = Math.floor(y / 32) * 32;
        if (Input.mouse.isPressed(Input.mouse.mRight())) {
            const target = this.editor.getTarget().getEditorEntity(this.selectedX, this.selectedY);
            if (target !== null) {
                this.editor.setCurrentID(target.getID());
            }
        }
    }
}

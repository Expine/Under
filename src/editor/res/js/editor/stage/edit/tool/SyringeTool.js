/**
 * Pencil tool
 * - Tool for editing
 * - Selects something
 * - ### Extracts entity
 * @extends {SelectingTool}
 * @classdesc Pencil tool to extract entity
 */
class SyringeTool extends SelectingTool { // eslint-disable-line  no-unused-vars
    /**
     * Update tool
     * @abstract
     * @param {number} x Target x position
     * @param {number} y Target y position
     * @param {number} dt Delta time
     */
    update(x, y, dt) {
        this.selectedX = Math.floor(x / 32) * 32;
        this.selectedY = Math.floor(y / 32) * 32;
        if (Input.mouse.isPressed(Input.mouse.mRight())) {
            let id = this.editor.getTarget().getID(this.selectedX, this.selectedY);
            if (id >= 0) {
                this.editor.setCurrentID(id);
            }
        }
    }
}

/**
 * Pencil tool
 * - Tool for editing
 * - Selects something
 * - ### Erases
 * @extends {SelectingTool}
 * @classdesc Pencil tool to erase
 */
class EraserTool extends SelectingTool { // eslint-disable-line  no-unused-vars
    /**
     * Eraser tool constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Eraser image
         * @protected
         * @type {GameImage}
         */
        this.image = new SingleImage(ResourceManager.image.load(`editor/eraser.png`), 16, 16);
    }

    /**
     * Update tool
     * @abstract
     * @param {number} x Target x position
     * @param {number} y Target y position
     * @param {number} dt Delta time
     */
    update(x, y, dt) {
        // swicth eraser (2)
        if (Input.key.isPress(Input.key.zero() + 2)) {
            this.editor.setCurrentID(-1);
            this.editor.changeTool(`eraser`);
        }
    }

    /**
     * Use tool by ID
     * @abstract
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

    /**
     * Render tool
     * @abstract
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        super.render(ctx, shiftX, shiftY);
        this.image.render(ctx, this.selectedX + shiftX + 16, this.selectedY + shiftY);
    }
}

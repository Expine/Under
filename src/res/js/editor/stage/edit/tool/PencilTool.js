/**
 * Pencil tool
 * - Tool for editing
 * - Selects something
 * - ### Paints one by one
 * @extends {SelectingTool}
 * @classdesc Pencil tool to paint one by one
 */
class PencilTool extends SelectingTool { // eslint-disable-line  no-unused-vars
    /**
     * Pencil tool constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Pencil image
         * @protected
         * @type {GameImage}
         */
        this.image = new SingleImage(ResourceManager.image.load(`editor/pencil.png`), 16, 16);
    }

    /**
     * Update tool
     * @abstract
     * @param {number} x Target x position
     * @param {number} y Target y position
     * @param {number} dt Delta time
     */
    update(x, y, dt) {
        // swicth pencil (1)
        if (Input.key.isPress(Input.key.zero() + 1)) {
            if (this.editor.getCurrentID() < 0) {
                this.editor.setCurrentID(0);
            }
            this.editor.changeTool(`pencil`);
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
        if (id >= 0 && Input.mouse.isPressed(Input.mouse.mLeft())) {
            this.editor.getTarget().paint(this.selectedX, this.selectedY, id);
        }
        if (id === -1) {
            this.editor.changeTool(`eraser`);
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

/**
 * Editor stage
 * Enable to put, remove and replace
 * @implements {SplitManagementStage}
 * @classdesc stage for editor
 */
class EditorStage extends SplitManagementStage { // eslint-disable-line  no-unused-vars
    /**
     * Editor stage constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * X position when right clicked
         * @type {number}
         */
        this.oldMouseX_ = 0;
        /**
         * Y position when right clicked
         * @type {number}
         */
        this.oldMouseY_ = 0;
    }

    /**
     * Update stage
     * @param {number} dt delta time
     */
    update(dt) {
        if (Input.it.isMousePress(Input.it.M.RIGHT)) {
            this.oldMouseX_ = Input.it.getMouseX();
            this.oldMouseY_ = Input.it.getMouseY();
        } else if (Input.it.isMousePressed(Input.it.M.RIGHT)) {
            let x = this.camera.cameraX + (Input.it.getMouseX() - this.oldMouseX_);
            let y = this.camera.cameraY + (Input.it.getMouseY() - this.oldMouseY_);
            this.camera.setCameraPosition(x, y, this.map.width, this.map.height);

            this.oldMouseX_ = Input.it.getMouseX();
            this.oldMouseY_ = Input.it.getMouseY();
        }
    }

    /**
     * Render stage
     * @param {Context} ctx - canvas context
     * @param {number} [shiftX = 0] shift x position
     * @param {number} [shiftY = 0] shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        super.render(ctx, shiftX, shiftY);
    }
}

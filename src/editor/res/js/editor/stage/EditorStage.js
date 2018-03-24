/**
 * Editor stage
 * Enable to put, remove and replace
 * @extends {SplitManagementStage}
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
         * Camera x position
         * @protected
         * @type {number}
         */
        this.cameraX = 0;
        /**
         * Camera y position
         * @protected
         * @type {number}
         */
        this.cameraY = 0;

        /**
         * Camera moving
         * @protected
         * @type {bool}
         */
        this.moving = false;
        /**
         * Right click start x position
         * @protected
         * @type {number}
         */
        this.moveStartX = 0;
        /**
         * Right click start y position
         * @protected
         * @type {number}
         */
        this.moveStartY = 0;
    }

    /**
     * Update stage
     * @override
     * @param {number} dt delta time
     */
    update(dt) {
        // update mutables and autonomies
        for (let it of this.mutables_) {
            it.update(dt);
        }
        // move by right click
        if (Input.it.isMousePress(Input.it.M.RIGHT)) {
            this.moveStartX = Input.it.getMouseX();
            this.moveStartY = Input.it.getMouseY();
            this.moving = true;
        } else if (this.moving && Input.it.isMousePressed(Input.it.M.RIGHT)) {
            this.cameraX += Input.it.getMouseX() - this.moveStartX;
            this.cameraY += Input.it.getMouseY() - this.moveStartY;
            this.moveStartX = Input.it.getMouseX();
            this.moveStartY = Input.it.getMouseY();
        }
        // update camera
        this.camera.setCameraPosition(this.cameraX, this.cameraY, this.map.width, this.map.height);
        this.cameraX = this.camera.cameraX;
        this.cameraY = this.camera.cameraY;
    }

    /**
     * Render stage
     * @param {Context} ctx - canvas context
     * @param {number} [shiftX = 0] shift x position
     * @param {number} [shiftY = 0] shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        super.render(ctx, shiftX, shiftY);

        let x = Math.floor((Input.it.getMouseX() - shiftX - this.camera.cameraX) / 32) * 32;
        let y = Math.floor((Input.it.getMouseY() - shiftY - this.camera.cameraY) / 32) * 32;
        // check camera position
        if (x + 32 >= -this.camera.cameraX && x < this.camera.screenWidth - this.camera.cameraX && y + 32 >= -this.camera.cameraY && y < this.camera.screenHeight - this.camera.cameraY) {
            if (0 <= x && x <= this.map.width && 0 <= y && y <= this.map.height) {
                ctx.strokeRect(x + this.camera.cameraX, y + this.camera.cameraY, 32, 32, `white`);
            }
        }
    }
}

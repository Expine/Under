/**
 * Camera for editor
 * @implements {Camera}
 * @classdesc Camera for editor
 */
class EditorCamera extends Camera { // eslint-disable-line  no-unused-vars
    /**
     * Camera Constructor
     * @constructor
     * @param {number} screenWidth camera screen width
     * @param {number} screenHeight camera screen height
     */
    constructor(screenWidth, screenHeight) {
        super(screenWidth, screenHeight);

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

        /**
         * Difference from actual screen width
         * @protected
         * @type {number}
         */
        this.screenDiffX = screenWidth - Screen.it.width;
        /**
         * Difference from actual screen height
         * @protected
         * @type {number}
         */
        this.screenDiffY = screenHeight - Screen.it.height;
    }

    /**
     * Set camera position
     * @param {number} x base x position
     * @param {number} y base y position
     * @param {number} width camera max width
     * @param {number} height camera max height
     */
    setCameraPosition(x, y, width, height) {
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

        this.screenWidth = Screen.it.width + this.screenDiffX;
        this.screenHeight = Screen.it.height + this.screenDiffY;

        if (this.cameraX > 0) {
            this.cameraX = 0;
        }
        if (this.cameraX < this.screenWidth - width) {
            this.cameraX = this.screenWidth - width;
        }
        if (this.cameraY > 0) {
            this.cameraY = 0;
        }
        if (this.cameraY < this.screenHeight - height) {
            this.cameraY = this.screenHeight - height;
        }
    }
}

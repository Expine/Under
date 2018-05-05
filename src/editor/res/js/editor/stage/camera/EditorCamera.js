/**
 * Editor camera
 * - Calculates the area to rendering
 * - ### Moves by right clicked and dragging
 * @implements {Camera}
 * @classdesc Editor camera to move by right clicked and dragging
 */
class EditorCamera extends Camera { // eslint-disable-line  no-unused-vars
    /**
     * Editor camera Constructor
     * @constructor
     * @param {Camera} baseCamera Base camera for delegation
     * @param {number} screenWidth camera screen width
     * @param {number} screenHeight camera screen height
     */
    constructor(baseCamera, screenWidth, screenHeight) {
        super();

        /**
         * Base camera for delegation
         * @protected
         * @type {Camera}
         */
        this.baseCamera = baseCamera;

        /**
         * Camera moving
         * @protected
         * @type {boolean}
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
        this.screenDiffX = screenWidth - GameScreen.it.width;
        /**
         * Difference from actual screen height
         * @protected
         * @type {number}
         */
        this.screenDiffY = screenHeight - GameScreen.it.height;

        // set size
        this.setScreenSize(screenWidth, screenHeight);
    }

    /**
     * Set camera position
     * @param {number} x base x position
     * @param {number} y base y position
     * @param {number} width camera max width
     * @param {number} height camera max height
     */
    setCameraPosition(x, y, width, height) {
        if (x > 0 && y > 0) {
            if (Input.mouse.isPress(Input.mouse.mRight())) {
                this.moveStartX = Input.mouse.getMouseX();
                this.moveStartY = Input.mouse.getMouseY();
                this.moving = true;
            } else if (this.moving && Input.mouse.isPressed(Input.mouse.mRight())) {
                this.cameraX += Input.mouse.getMouseX() - this.moveStartX;
                this.cameraY += Input.mouse.getMouseY() - this.moveStartY;
                this.moveStartX = Input.mouse.getMouseX();
                this.moveStartY = Input.mouse.getMouseY();
            }
        } else {
            this.cameraX = x;
            this.cameraY = y;
        }

        this.screenWidth = GameScreen.it.width + this.screenDiffX;
        this.screenHeight = GameScreen.it.height + this.screenDiffY;
        this.baseCamera.setScreenSize(this.screenWidth, this.screenHeight);

        if (this.cameraX < this.screenWidth - width) {
            this.cameraX = this.screenWidth - width;
        }
        if (this.cameraX > 0) {
            this.cameraX = 0;
        }
        if (this.cameraY > 0) {
            this.cameraY = 0;
        }
        if (this.cameraY < this.screenHeight - height) {
            this.cameraY = this.screenHeight - height;
        }
    }
}

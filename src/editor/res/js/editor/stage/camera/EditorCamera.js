/**
 * Editor camera
 * - Calculates the area to rendering
 * - Delegates some processing to another camera
 * - ### Moves by right clicked and dragging
 * @extends {DelegateCamera}
 * @classdesc Editor camera to move by right clicked and dragging
 */
class EditorCamera extends DelegateCamera { // eslint-disable-line  no-unused-vars
    /**
     * Editor camera Constructor
     * @constructor
     * @param {Camera} baseCamera Base camera for delegation
     */
    constructor(baseCamera) {
        super(baseCamera);

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
        this.screenDiffX = 0;
        /**
         * Difference from actual screen height
         * @protected
         * @type {number}
         */
        this.screenDiffY = 0;
    }

    /**
     * Set screen size
     * @override
     * @param {number} screenWidth Camera screen width
     * @param {number} screenHeight Camera screen height
     */
    setScreenSize(screenWidth, screenHeight) {
        super.setScreenSize(screenWidth, screenHeight);

        this.screenDiffX = screenWidth - GameScreen.it.width;
        this.screenDiffY = screenHeight - GameScreen.it.height;
    }

    /**
     * Update camera
     * @override
     * @param {number} x Base x position
     * @param {number} y Base y position
     * @param {number} dt Delta time
     */
    update(x, y, dt) {
        // move by mouse
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
        // move by key
        if (Input.key.isPress(Input.key.right())) {
            this.cameraX = this.cameraX - this.screenWidth / 2;
        }
        if (Input.key.isPress(Input.key.left())) {
            this.cameraX = this.cameraX + this.screenWidth / 2;
        }
        if (Input.key.isPress(Input.key.up())) {
            this.cameraY = this.cameraY + this.screenHeight / 2;
        }
        if (Input.key.isPress(Input.key.down())) {
            this.cameraY = this.cameraY - this.screenHeight / 2;
        }
    }
}

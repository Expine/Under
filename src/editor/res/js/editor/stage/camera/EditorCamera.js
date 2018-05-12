/**
 * Editor camera
 * - Calculates the area to rendering
 * - ### Moves by right clicked and dragging
 * @extends {Camera}
 * @classdesc Editor camera to move by right clicked and dragging
 */
class EditorCamera extends Camera { // eslint-disable-line  no-unused-vars
    /**
     * Editor camera Constructor
     * @constructor
     * @param {Camera} baseCamera Base camera for delegation
     */
    constructor(baseCamera) {
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
        this.baseCamera.setScreenSize(screenWidth, screenHeight);

        this.screenDiffX = screenWidth - GameScreen.it.width;
        this.screenDiffY = screenHeight - GameScreen.it.height;
    }

    /**
     * Set camera max size
     * @override
     * @param {number} maxWidth Camera max width
     * @param {number} maxHeight Cmera max height
     */
    setMaxSize(maxWidth, maxHeight) {
        super.setMaxSize(maxWidth, maxHeight);
        this.baseCamera.setMaxSize(maxWidth, maxHeight);
    }

    /**
     * Initialize camera
     * @override
     * @param {number} x First camera x position
     * @param {number} y First camera y position
     */
    init(x, y) {
        this.baseCamera.init(x, y);
        this.cameraX = this.baseCamera.cameraX;
        this.cameraY = this.baseCamera.cameraY;
    }

    /**
     * Update camera
     * @override
     * @param {number} x Base x position
     * @param {number} y Base y position
     * @param {number} dt Delta time
     */
    update(x, y, dt) {
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
    }
}

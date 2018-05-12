/**
 * Clip camera
 * - Calculates the area to rendering
 * - ### Cliping camera position by stage size
 * @extends {Camera}
 * @classdesc Clip camera for cliping camera position by stage size
 */
class ClipCamera extends Camera { // eslint-disable-line  no-unused-vars
    /**
     * Clip camera
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
        this.clip();
    }

    /**
     * Update camera
     * @override
     * @param {number} x Base x position
     * @param {number} y Base y position
     * @param {number} dt Delta time
     */
    update(x, y, dt) {
        // set position
        this.baseCamera.update(x, y, dt);
        this.clip();
    }

    /**
     * Clip camera position
     * @protected
     */
    clip() {
        this.cameraX = this.baseCamera.cameraX;
        this.cameraY = this.baseCamera.cameraY;

        // cliping
        if (this.cameraX < this.screenWidth - this.maxWidth) {
            this.cameraX = this.screenWidth - this.maxWidth;
        }
        if (this.cameraX > 0) {
            this.cameraX = 0;
        }
        if (this.cameraY > 0) {
            this.cameraY = 0;
        }
        if (this.cameraY < this.screenHeight - this.maxHeight) {
            this.cameraY = this.screenHeight - this.maxHeight;
        }
        // apply
        this.baseCamera.cameraX = this.cameraX;
        this.baseCamera.cameraY = this.cameraY;
    }
}

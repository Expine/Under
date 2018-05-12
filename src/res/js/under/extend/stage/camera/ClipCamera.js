/**
 * Clip camera
 * - Calculates the area to rendering
 * - ### Cliping camera position by stage size
 * @implements {Camera}
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
     * Update camera
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        this.baseCamera.update(dt);
    }

    /**
     * Set camera position
     * @param {number} x Base x position
     * @param {number} y Base y position
     * @param {number} width Camera max width
     * @param {number} height Camera max height
     */
    setCameraPosition(x, y, width, height) {
        // set position
        this.baseCamera.setCameraPosition(x, y, width, height);
        this.cameraX = this.baseCamera.cameraX;
        this.cameraY = this.baseCamera.cameraY;
        this.screenWidth = this.baseCamera.screenWidth;
        this.screenHeight = this.baseCamera.screenHeight;

        // cliping
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
        // restore
        this.baseCamera.cameraX = this.cameraX;
        this.baseCamera.cameraY = this.cameraY;
    }
}

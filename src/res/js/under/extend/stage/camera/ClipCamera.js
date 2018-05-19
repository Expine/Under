/**
 * Clip camera
 * - Calculates the area to rendering
 * - Delegates some processing to another camera
 * - ### Cliping camera position by stage size
 * @extends {DelegateCamera}
 * @classdesc Clip camera for cliping camera position by stage size
 */
class ClipCamera extends DelegateCamera { // eslint-disable-line  no-unused-vars
    /**
     * Initialize camera
     * @override
     * @param {number} x First camera x position
     * @param {number} y First camera y position
     */
    init(x, y) {
        super.init(x, y);
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
        super.update(x, y, dt);
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

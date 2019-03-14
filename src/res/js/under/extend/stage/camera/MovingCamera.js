/**
 * Moving center camera
 * - Calculates the area to rendering
 * - Delegates some processing to another camera
 * - ### Move gradually, not instantaneously
 * @extends {DelegateCamera}
 * @classdesc Moving center camera to move gradually, not instantaneously
 */
class MovingCamera extends DelegateCamera {
    /**
     * Update camera
     * @override
     * @param {number} x Base x position
     * @param {number} y Base y position
     * @param {number} dt Delta time
     */
    update(x, y, dt) {
        super.update(x, y, dt);

        // move gradually
        if (this.cameraX !== this.baseCamera.cameraX || this.cameraY !== this.baseCamera.cameraY) {
            this.cameraX = this.cameraX + (this.baseCamera.cameraX - this.cameraX) * dt / 200;
            this.cameraY = this.cameraY + (this.baseCamera.cameraY - this.cameraY) * dt / 200;
        }
    }
}

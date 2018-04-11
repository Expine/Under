/**
 * Center camera
 * - Calculates the area to rendering
 * - ### Centering at the indicated coordinates
 * @implements {Camera}
 * @classdesc Center camera for centering at the indicated coodinates
 */
class CenterCamera extends Camera { // eslint-disable-line  no-unused-vars
    /**
     * Set camera position
     * @param {number} x Base x position
     * @param {number} y Base y position
     * @param {number} width Camera max width
     * @param {number} height Camera max height
     */
    setCameraPosition(x, y, width, height) {
        this.cameraX = this.screenWidth / 2 - x;
        this.cameraY = this.screenHeight / 2 - y;
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

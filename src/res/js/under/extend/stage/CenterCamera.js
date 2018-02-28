/**
 * Camera for centering at the indicated coordinates
 * Does not draw the portion beyond the given maximum area
 * Priority is given from left and bottom
 * @implements {Camera}
 * @classdesc Camera for centering at the indicated coordinates
 */
class CenterCamera extends Camera { // eslint-disable-line  no-unused-vars
    /**
     * Set camera position
     * @param {number} x base x position
     * @param {number} y base y position
     * @param {number} width camera max width
     * @param {number} height camera max height
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

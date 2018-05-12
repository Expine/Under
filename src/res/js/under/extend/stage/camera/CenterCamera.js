/**
 * Center camera
 * - Calculates the area to rendering
 * - ### Centering at the indicated coordinates
 * @extends {Camera}
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
    }
}

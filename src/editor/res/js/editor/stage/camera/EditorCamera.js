/**
 * Camera for editor
 * @implements {Camera}
 * @classdesc Camera for editor
 */
class EditorCamera extends Camera { // eslint-disable-line  no-unused-vars
    /**
     * Set camera position
     * @param {number} x base x position
     * @param {number} y base y position
     * @param {number} width camera max width
     * @param {number} height camera max height
     */
    setCameraPosition(x, y, width, height) {
        this.screenWidth = Screen.it.width;
        this.screenHeight = Screen.it.height - 250;

        this.cameraX = x;
        this.cameraY = y;
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

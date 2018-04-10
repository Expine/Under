/**
 * Fitable screen
 * - Indicates the rendering target and input target
 * - It can generate a canvas automatically
 * - Both Input and rendering target is canvas
 * - ### Fits the window
 * @extends {GeneratableScreen}
 * @classdesc Fitable screen to fit the window
 */
class FitableScreen extends GeneratableScreen { // eslint-disable-line     no-unused-vars
    /**
     * Initialize screen
     * @override
     */
    init() {
        // resize
        (window.onresize = () => {
            let size = Math.min((innerWidth - 16) / this.width, (innerHeight - 16) / this.height);
            this.width = size * this.width;
            this.height = size * this.height;
            this.canvas.width = this.width;
            this.canvas.style.width = this.canvas.width + `px`;
            this.canvas.height = this.height;
            this.canvas.style.height = this.canvas.height + `px`;
            let ctx = this.canvas.getContext(`2d`);
            ctx.mozImageSmoothingEnabled = false;
            ctx.webkitImageSmoothingEnabled = false;
            ctx.msImageSmoothingEnabled = false;
            ctx.imageSmoothingEnabled = false;
        })();
    }
}

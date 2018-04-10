/**
 * Scalable screen
 * - Indicates the rendering target and input target
 * - It can generate a canvas automatically
 * - Both Input and rendering target is canvas
 * - ### Scales screen automatically
 * @extends {GeneratableScreen}
 * @classdesc Scalable screen to scale automatically
 */
class ScalableScreen extends GeneratableScreen { // eslint-disable-line     no-unused-vars
    /**
     * Initialize screen
     * @override
     */
    init() {
        super.init();
        // resize
        (window.onresize = () => {
            this.gameSize = Math.min((innerWidth - 16) / this.width, (innerHeight - 16) / this.height);
            this.canvas.width = this.gameSize * this.width;
            this.canvas.style.width = this.canvas.width + `px`;
            this.canvas.height = this.gameSize * this.height;
            this.canvas.style.height = this.canvas.height + `px`;
            let ctx = this.canvas.getContext(`2d`);
            ctx.mozImageSmoothingEnabled = false;
            ctx.webkitImageSmoothingEnabled = false;
            ctx.msImageSmoothingEnabled = false;
            ctx.imageSmoothingEnabled = false;
        })();
    }
}

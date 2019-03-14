/**
 * Generatable screen
 * - Indicates the rendering target and input target
 * - Both input and rendering target is canvas
 * - ### It can generate a canvas automatically
 * @extends {CanvasScreen}
 * @classdesc Generatable screen to generate a canvas automatically
 */
class GeneratableScreen extends CanvasScreen {
    /**
     * Initialize screen
     * @override
     */
    init() {
        // generate canvas
        this.canvas = document.createElement(`canvas`);
        // set canvas
        document.body.appendChild(this.canvas);

        // generate style
        const style = document.createElement(`style`);
        style.append(`canvas {display:block;width: ` + this.width + `px;height: ` + this.height + `px;margin: 0px auto;}`);
        document.head.appendChild(style);

        // set canvas default size
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.setAttribute(`style`, `canvas`);
    }
}

/**
 * Detective screen
 * - Indicates the rendering target and input target
 * - Both input and rendering target is canvas
 * - ### It can detect canvas
 * @extends {CanvasScreen}
 * @classdesc Detective screen to detect canvas
 */
class DetectiveScreen extends CanvasScreen { // eslint-disable-line  no-unused-vars
    /**
     * Initialize screen
     * @override
     */
    init() {
        // detect canvas
        this.canvas = document.querySelector(`canvas`);

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

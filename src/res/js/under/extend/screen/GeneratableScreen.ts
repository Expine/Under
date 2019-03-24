import { CanvasScreen } from "./CanvasScreen";

/**
 * Generatable screen
 * - It can generate a canvas automatically
 * @extends {CanvasScreen}
 * @classdesc Generatable screen to generate a canvas automatically
 */
export class GeneratableScreen extends CanvasScreen {
    /**
     * Game canvas
     * @protected
     * @type {HTMLCanvasElement}
     */
    protected canvas: HTMLCanvasElement;

    /**
     * Canvas screen constructor
     * @constructor
     * @constructor
     * @param {number} [width = 800] Screen width
     * @param {number} [height = 600] Screen height
     */
    constructor(width: number = 800, height: number = 600) {
        super(width, height);

        // generate canvas
        this.canvas = document.createElement(`canvas`);
        // set canvas
        document.body.appendChild(this.canvas);
    }

    /**
     * Initialize screen
     * @override
     */
    init() {
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

import { CanvasScreen } from "./CanvasScreen";

/**
 * Detective screen
 * - It can detect canvas
 * @extends {CanvasScreen}
 * @classdesc Detective screen to detect canvas
 */
export class DetectiveScreen extends CanvasScreen {
    /**
     * Game canvas
     * @protected
     * @type {HTMLCanvasElement}
     */
    protected canvas: HTMLCanvasElement;

    /**
     * Canvas screen constructor
     * @constructor
     * @param {number} [width = 800] Screen width
     * @param {number} [height = 600] Screen height
     */
    constructor(width: number = 800, height: number = 600) {
        super(width, height);

        // detect canvas
        this.canvas = document.querySelectorAll(`canvas`).item(0);
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

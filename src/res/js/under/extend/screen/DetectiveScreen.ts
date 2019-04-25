import { CanvasScreen } from "./CanvasScreen";

/**
 * - It can detect canvas from html and set it automatically.
 */
export class DetectiveScreen
    extends CanvasScreen
{
    /**
     * @param width Width of game screen size.
     * @param height Height of game screen size.
     */
    constructor(width: number, height: number)
    {
        super(document.querySelectorAll(`canvas`).item(0), width, height);
    }

    /**
     * @override
     */
    init()
    {
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

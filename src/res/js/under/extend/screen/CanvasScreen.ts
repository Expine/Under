import { GameScreen } from "../../base/screen/GameScreen";

/**
 * - Generate screen using the canvas.
 * - Both input and rendering target is canvas.
 * @abstract
 * @classdesc Generate canvas to make screen target for inputing and rendering.
 */
export abstract class CanvasScreen
    extends GameScreen
{
    /**
     * @param canvas Canvas for inputing and rendering.
     * @param width Width of game screen size.
     * @param height Height of game screen size.
     */
    constructor(protected canvas: HTMLCanvasElement, width: number, height: number)
    {
        super(width, height);

        // generate style
        const style = document.createElement(`style`);
        style.append(`canvas {display:block;width: ` + width + `px;height: ` + height + `px;margin: 0px auto;}`);
        document.head.appendChild(style);
        // set canvas default size
        this.canvas.setAttribute(`style`, `canvas`);
        this.canvas.width = width;
        this.canvas.height = height;
    }


    /**
     * @override
     */
    getTarget(): HTMLElement { return this.canvas; }

    /**
     * @override
     */
    getCanvas(): HTMLCanvasElement { return this.canvas; }
}

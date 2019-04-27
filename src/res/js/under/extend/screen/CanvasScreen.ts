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
     * @param mWidth Width of game screen size.
     * @param mHeight Height of game screen size.
     */
    constructor(protected canvas: HTMLCanvasElement, mWidth: number, mHeight: number)
    {
        super(mWidth, mHeight);

        // generate style
        const style = document.createElement('style');
        style.append(
            `canvas {
                display:block;
                width: ${mWidth}px;
                height: ${mHeight}px;
                margin: 0px auto;
            }`
        );
        document.head.appendChild(style);
        // set canvas default size
        this.canvas.setAttribute('style', 'canvas');
        this.canvas.width = mWidth;
        this.canvas.height = mHeight;
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

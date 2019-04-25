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

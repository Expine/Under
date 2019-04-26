import { CanvasScreen } from "./CanvasScreen";

/**
 * - It can generate a canvas automatically.
 */
export class GeneratableScreen
    extends CanvasScreen
{
    /**
     * @param width Width of game screen size.
     * @param height Height of game screen size.
     */
    constructor(width: number, height: number)
    {
        super(document.createElement(`canvas`), width, height);

        // set canvas
        document.body.appendChild(this.canvas);
    }
}

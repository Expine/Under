import { CanvasScreen } from "./CanvasScreen";

/**
 * - It can generate a canvas automatically.
 */
export class GeneratableScreen
    extends CanvasScreen
{
    /**
     * @param mWidth Width of game screen size.
     * @param mHeight Height of game screen size.
     */
    constructor(mWidth: number, mHeight: number)
    {
        super(document.createElement(`canvas`), mWidth, mHeight);

        // set canvas
        document.body.appendChild(this.canvas);
    }
}

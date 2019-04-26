import { CanvasScreen } from "./CanvasScreen";
import { HTMLUtil } from "../util/HTMLUtil";

/**
 * - It can detect canvas from html and set it automatically.
 */
export class DetectiveScreen
    extends CanvasScreen
{
    /**
     * @param mWidth Width of game screen size.
     * @param mHeight Height of game screen size.
     */
    constructor(mWidth: number, mHeight: number)
    {
        super(HTMLUtil.querySelectorNotNull('canvas'), mWidth, mHeight);
    }
}

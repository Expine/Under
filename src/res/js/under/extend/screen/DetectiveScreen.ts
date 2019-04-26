import { CanvasScreen } from "./CanvasScreen";
import { HTMLUtil } from "../util/HTMLUtil";

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
        super(HTMLUtil.querySelectorNotNull('canvas'), width, height);
    }
}

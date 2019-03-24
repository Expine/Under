import { ImageBackground } from "./ImageBackground";
import { Context } from "../../../base/resources/image/Context";

/**
 * Invariant background
 * - Background where the background does not move
 * @extends {ImageBackground}
 * @classdesc Invariant background where the background does not move
 */
export class InvariantBackground extends ImageBackground {
    /**
     * Render background
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     * @param {number} screenWidth Scren width
     * @param {number} screenHeight Scren height
     */
    render(ctx: Context, _shiftX: number, _shiftY: number, _screenWidth: number, _screenHeight: number) {
        this.backImage.render(ctx, 0, 0);
    }
}

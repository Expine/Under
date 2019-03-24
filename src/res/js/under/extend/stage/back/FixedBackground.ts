import { ImageBackground } from "./ImageBackground";
import { GameImage } from "../../../base/resources/image/GameImage";
import { Context } from "../../../base/resources/image/Context";

/**
 * Fixed background
 * - Background that is fixed to certain coordinates
 * @extends {ImageBackground}
 * @classdesc Fixed background that is fixed to certain coordinates
 */
export class FixedBackground extends ImageBackground {
    /**
     * Background x position
     * @protected
     * @type {number}
     */
    protected x: number;
    /**
     * Background y position
     * @protected
     * @type {number}
     */
    protected y: number;

    /**
     * Fixed background constructor
     * @constructor
     * @param {GameImage} backImage Background image
     * @param {number} x Background x position
     * @param {number} y Background x position
     */
    constructor(backImage: GameImage, x: number, y: number) {
        super(backImage);

        this.x = x;
        this.y = y;
    }

    /**
     * Render background
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     * @param {number} screenWidth Scren width
     * @param {number} screenHeight Scren height
     */
    render(ctx: Context, shiftX: number, shiftY: number, _screenWidth: number, _screenHeight: number) {
        this.backImage.render(ctx, this.x + shiftX, this.y + shiftY);
    }
}

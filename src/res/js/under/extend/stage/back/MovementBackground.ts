import { ImageBackground } from "./ImageBackground";
import { GameImage } from "../../../base/resources/image/GameImage";
import { Context } from "../../../base/resources/image/Context";

/**
 * Movement background
 * - Moves relatively
 * @extends {ImageBackground}
 * @classdesc Movement background to move relatively
 */
export class MovementBackground extends ImageBackground {
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
     * Ratio of speed of x velocity
     * @protected
     * @type {number}
     */
    protected speedRatioX: number;
    /**
     * Ratio of speed of y velocity
     * @protected
     * @type {number}
     */
    protected speedRatioY: number;

    /**
     * Movement background constructor
     * @constructor
     * @param {GameImage} backImage Background image
     * @param {number} x Background x position
     * @param {number} y Background x position
     * @param {number} speedRatioX Ratio of speed of x velocity
     * @param {number} speedRatioY Ratio of speed of y velocity
     */
    constructor(backImage: GameImage, x: number, y: number, speedRatioX: number, speedRatioY: number) {
        super(backImage);

        this.x = x;
        this.y = y;
        this.speedRatioX = speedRatioX;
        this.speedRatioY = speedRatioY;
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
        this.backImage.render(ctx, this.x + shiftX * this.speedRatioX, this.y + shiftY * this.speedRatioY);
    }
}

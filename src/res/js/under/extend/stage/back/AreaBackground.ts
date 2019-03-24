import { GameImage } from "../../../base/resources/image/GameImage";
import { ImageBackground } from "./ImageBackground";
import { Context } from "../../../base/resources/image/Context";

/**
 * Movement background
 * - Renders certain area
 * @extends {ImageBackground}
 * @classdesc Movement background to render certain area
 */
export class AreaBackground extends ImageBackground {
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
     * Renderign area width
     * @protected
     * @type {number}
     */
    protected areaWidth: number;
    /**
     * Renderign area height
     * @protected
     * @type {number}
     */
    protected areaHeight: number;
    /**
     * Movement background constructor
     * @constructor
     * @param {GameImage} backImage Background image
     * @param {number} x Background x position
     * @param {number} y Background x position
     * @param {number} areaWidth Renderign area width
     * @param {number} areaHeight Rendering area height
     */
    constructor(backImage: GameImage, x: number, y: number, areaWidth: number, areaHeight: number) {
        super(backImage);

        this.x = x;
        this.y = y;
        this.areaWidth = areaWidth;
        this.areaHeight = areaHeight;
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
    render(ctx: Context, shiftX: number, shiftY: number, screenWidth: number, screenHeight: number) {
        let x = -shiftX - this.x;
        let y = -shiftY - this.y;
        const width = this.backImage.getWidth();
        const height = this.backImage.getHeight();
        if (x <= 0) {
            x = this.x + shiftX;
        } else if (this.areaWidth - screenWidth <= -shiftX - this.x) {
            x = this.x + shiftX - width + this.areaWidth;
        } else {
            x = -(screenWidth - width) / (this.areaWidth - screenWidth) * (shiftX + this.x);
        }
        if (y <= 0) {
            y = this.y + shiftY;
        } else if (this.areaHeight - screenHeight <= -shiftY - this.y) {
            y = this.y + shiftY - height + this.areaHeight;
        } else {
            y = -(screenHeight - height) / (this.areaHeight - screenHeight) * (shiftY + this.y);
        }
        this.backImage.render(ctx, x, y);
    }
}

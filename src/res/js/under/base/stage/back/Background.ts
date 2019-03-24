import { Context } from "../../resources/image/Context";

/**
 * Background
 * - Renders and update backgrdoun image
 * @abstract
 * @classdesc Background to render and update background image
 */
export abstract class Background {
    /**
     * Initialize background
     * @abstract
     */
    abstract init(): void;

    /**
     * Update background
     * @abstract
     * @param {number} dt delta time
     */
    abstract update(dt: number): void;

    /**
     * Render background
     * @abstract
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     * @param {number} screenWidth Scren width
     * @param {number} screenHeight Scren height
     */
    abstract render(ctx: Context, shiftX: number, shiftY: number, screenWidth: number, screenHeight: number): void;
}

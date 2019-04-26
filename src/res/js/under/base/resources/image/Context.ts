import { IImageManager } from './../IImageManager';
import { GameScreen } from "../../screen/GameScreen";
import { ResourceID } from '../IResourceManager';

/**
 * - Controls rendering to the screen.
 * @abstract
 */
export abstract class Context
{
    /**
     * @param screen Screen to render image.
     * @param image Image manager for using by rendering image.
     */
    constructor(protected screen: GameScreen, protected image: IImageManager) { }

    /**
     * Function to be executed before drawing.
     */
    abstract preRendering(): void;

    /**
     * Function to be executed after drawing.
     */
    abstract postRendering(): void;

    /**
     * Get rendering text width in this context.
     * @param aText Rendering text.
     * @param aSize Font size.
     * @param aFont Font name.
     * @return Text width in this context.
     */
    abstract measureText(aText: string, aSize?: number, aFont?: string): number;

    /**
     * Render text.
     * @param aText Rendering text.
     * @param aX X position.
     * @param aY position.
     * @param aAnchorX Anchor x point in percent (0.0 <= anchorX <= 1.0).
     * @param aAnchorY Anchor y point in percent (0.0 <= anchorX <= 1.0).
     * @param aSize Font size.
     * @param aColor Font color.
     * @param aFont Font name.
     */
    abstract fillText(
        aText: string, aX: number, aY: number, aAnchorX?: number, aAnchorY?: number,
        aSize?: number, aColor?: string, aFont?: string
    ): void;

    /**
     * Rendering line.
     * @param aSrcX Start x position.
     * @param aSrcY Start y position.
     * @param aDstX Terminal x position.
     * @param aDstY Terminal y position.
     * @param aColor Color name of line.
     * @param aLineWidth Line width.
     */
    abstract strokeLine(
        aSrcX: number, aSrcU: number, aDstX: number, aDstY: number,
        aColor?: string, aLineWidth?: number
    ): void;

    /**
     * Rendering circle outline.
     * @param aX X position of center of circle.
     * @param aY Y position of center of circle.
     * @param aRadius Radius of circle.
     * @param aStartAngle Beginning of arc.
     * @param aEndAngle End of arc.
     * @param aAnticlockwise Whether it is clockwise or not.
     * @param aColor Color name of circle.
     * @param alineWidth Line of circle width.
     */
    abstract strokeCircle(
        aX: number, aY: number, aRadius: number, aStartAngle: number, aEndAngle: number, aAnticlockwise: boolean,
        aColor?: string, aLineWidth?: number
    ): void;

    /**
     * Rendering rectangle outline.
     * @param aX Upper left x position of rectangle.
     * @param aY Upper left y position of rectangle.
     * @param aWidth Width of the rectangle.
     * @param aHeight Height of the rectangle.
     * @param aColor Color name of rectangle.
     * @param aLineWidth Line of rectangle width.
     */
    abstract strokeRect(aX: number, aY: number, aWidth: number, aHeight: number, aColor?: string, aLineWidth?: number): void;

    /**
     * Rendering rectangle.
     * @param aX Upper left x position of rectangle.
     * @param aY Upper left y position of rectangle.
     * @param aWidth Width of the rectangle.
     * @param aHeight Height of the rectangle.
     * @param aColor Color name of rectangle.
     * @param aLineWidth Line of rectangle width.
     */
    abstract fillRect(aX: number, aY: number, aWidth: number, aHeight: number, aColor?: string, aLineWidth?: number): void;

    /**
     * Rendering image.
     * @param aImageID Image ID.
     * @param aX Upper left x position of image.
     * @param aY Upper left y position of image.
     * @param aWidth Width of the image.
     * @param aHeight Height of the image.
     * @param aSrcX Upper left x position of source.
     * @param aSrcY Upper left y position of source.
     * @param aSrcW Source width.
     * @param aSrcH Source height.
     */
    abstract drawImage(
        aImageID: ResourceID, aX: number, aY: number, aWidth?: number, aHeight?: number,
        aSrcX?: number, aSrcY?: number, aSrcW?: number, aSrcH?: number
    ): void;
}

import { IImageManager } from './../IImageManager';
import { GameScreen } from "../../screen/GameScreen";
import { ResourceID } from '../IResourceManager';

/**
 * Context
 * - Controls rendering to the screen
 * @abstract
 * @classdesc Context for rendering to the screen
 */
export abstract class Context {
    /**
     * Screen for rendering
     * @protected
     * @type {GameScreen}
     */
    protected screen: GameScreen;

    /**
     * Context image manager
     * @protected
     * @type {IImageManager}
     */
    protected image: IImageManager;

    /**
     * Context constructor
     * @constructor
     * @param {GameScreen} screen Screen to render image
     * @param {IImageManager} image Image manager
     */
    constructor(screen: GameScreen, image: IImageManager) {
        this.screen = screen;
        this.image = image;
    }

    /**
     * Initialize context
     * @abstract
     */
    abstract init(): void;

    /**
     * Function to be executed before drawing
     * @abstract
     */
    abstract preRendering(): void;

    /**
     * Function to be executed after drawing
     * @abstract
     */
    abstract postRendering(): void;

    /**
     * Get rendering text width
     * @abstract
     * @param {string} text Rendering text
     * @param {number | null} size Font size
     * @param {string | null} font Font name
     * @return {number} Text width
     */
    abstract measureText(text: string, size: number | null, font: string | null): number;

    /**
     * Render text
     * @abstract
     * @param {string} text Rendering text
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number | null} anchorX Anchor x point in percent (0.0 <= anchorX <= 1.0)
     * @param {number | null} anchorY Anchor y point in percent (0.0 <= anchorX <= 1.0)
     * @param {number | null} size Font size
     * @param {string | null} color Font color
     * @param {string | null} font Font name
     */
    abstract fillText(text: string, x: number, y: number, anchorX: number | null, anchorY: number | null, size: number | null, color: string | null, font: string | null): void;

    /**
     * Rendering line
     * @abstract
     * @param {number} sx Start x position
     * @param {number} sy Start y position
     * @param {number} ex Terminal x position
     * @param {number} ey Terminal y position
     * @param {string} color Color name of line
     * @param {number} lineWidth Line width
     */
    abstract strokeLine(sx: number, sy: number, ex: number, ey: number, color: string | null, lineWidth: number | null): void;

    /**
     * Rendering circle outline
     * @abstract
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} radius Raius of circle
     * @param {number} startAngle Beginning of arc
     * @param {number} endAngle End of arc
     * @param {boolean} anticlockwise Whether it is clockwise or not
     * @param {string} color Color name of circle
     * @param {number} lineWidth Line of circle width
     */
    abstract strokeCircle(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise: boolean, color: string | null, lineWidth: number | null): void;

    /**
     * Rendering rectangle outline
     * @abstract
     * @param {number} x Upper left x position
     * @param {number} y Upper left y position
     * @param {number} width Width of the rectangle
     * @param {number} height Height of the rectangle
     * @param {string} color Color name of rectangle
     * @param {number} lineWidth Line of rectangle width
     */
    abstract strokeRect(x: number, y: number, width: number, height: number, color: string | null, lineWidth: number | null): void;

    /**
     * Rendering rectangle
     * @abstract
     * @param {number} x Upper left x position
     * @param {number} y Upper left y position
     * @param {number} width Width of the rectangle
     * @param {number} height Height of the rectangle
     * @param {string} color Color name of rectangle
     * @param {number} lineWidth Line of rectangle width
     */
    abstract fillRect(x: number, y: number, width: number, height: number, color: string | null, lineWidth: number | null): void;

    /**
     * Rendering image
     * @abstract
     * @param {ResourceID} imageID Image ID
     * @param {number} x Image x position
     * @param {number} y Image y position
     * @param {number | null} width Image width
     * @param {number | null} height Image height
     * @param {number | null} srcX Upper left x position of source
     * @param {number | null} srcY Upper left y position of source
     * @param {number | null} srcW Source width
     * @param {number | null} srcH Source height
     */
    abstract drawImage(imageID: ResourceID, x: number, y: number, width: number | null, height: number | null, srcX: number | null, srcY: number | null, srcW: number | null, srcH: number | null): void;
}

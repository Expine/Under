import { IImageManager } from './../../../base/resources/IImageManager';
import { Context } from "../../../base/resources/image/Context";
import { GameScreen } from "../../../base/screen/GameScreen";
import { ResourceID } from '../../../base/resources/IResourceManager';

/**
 * JavaScript context
 * - Renders by using HTML5 API
 * @extends {Context}
 * @classdesc JavaScript context for rendering by using HTML5 API
 */
export class JSContext extends Context {
    /**
     * Color of the text
     * @private
     * @type {string}
     */
    private _fontColor: string = `black`;
    /**
     * Size of the text
     * @private
     * @type {number}
     */
    private _fontSize: number = 50;
    /**
     * Font name of the text
     * @private
     * @type {string}
     */
    private _fontName: string = `Arial`;

    /**
     * Color of the line
     * @private
     * @type {string}
     */
    private _lineColor: string = `red`;
    /**
     * Size of the line
     * @private
     * @type {number}
     */
    private _lineWidth: number = 1;

    /**
     * Canvas context for rendering
     * @protected
     * @type {CanvasRenderingContext2D}
     */
    protected ctx: CanvasRenderingContext2D;

    /**
     * JavaScript context constructor
     * @constructor
     * @param {GameScreen} screen Screen to render image
     * @param {IImageManager} image Image manager
     */
    constructor(screen: GameScreen, image: IImageManager) {
        super(screen, image);
        this._fontColor = `black`;
        this._fontSize = 50;
        this._fontName = `Arial`;

        this._lineColor = `red`;
        this._lineWidth = 1;

        this.ctx = this.screen.getCanvas().getContext(`2d`) as CanvasRenderingContext2D;
    }

    /**
     * Initialize context
     * @override
     */
    init() {
    }

    /**
     * Function to be executed before drawing
     * @override
     */
    preRendering() {
        // ignore antialiasing
        this.ctx.imageSmoothingEnabled = false;
        // save state
        this.ctx.save();
        // scale rendering size
        this.ctx.scale(this.screen.getGameSize(), this.screen.getGameSize());
        // render background
        this.ctx.fillStyle = `black`;
        this.ctx.fillRect(0, 0, this.screen.getWidth(), this.screen.getHeight());
    }

    /**
     * Function to be executed after drawing
     * @override
     */
    postRendering() {
        this.ctx.restore();
    }

    /**
     * Render text
     * @override
     * @param {string} text Rendering text
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} [anchorX=0] Anchor x point in percent (0.0 <= anchorX <= 1.0)
     * @param {number} [anchorY=0] Anchor y point in percent (0.0 <= anchorX <= 1.0)
     * @param {number} [size=fontSize] Font size
     * @param {string} [color=fontColor] Font color
     * @param {string} [font=fontName] Font name
     */
    fillText(text: string, x: number, y: number, anchorX: number | null, anchorY: number | null, size: number | null, color: string | null, font: string | null) {
        if (size === null) {
            size = this._fontSize;
        }
        if (font === null) {
            font = this._fontName;
        }
        this.ctx.font = size + `px ` + font;
        if (color === null) {
            color = this._fontColor;
        }
        this.ctx.fillStyle = color;
        if (anchorX == null) {
            anchorX = 0;
        }
        if (anchorY == null) {
            anchorY = 0;
        }
        this.ctx.fillText(text, x - anchorX * this.ctx.measureText(text).width, y + (1 - anchorY) * size);
    }

    /**
     * Get rendering text width
     * @abstract
     * @param {string} text Rendering text
     * @param {number | null} [size=fontSize] Font size
     * @param {string | null} [font=fontName] Font name
     * @return {number} Text width
     */
    measureText(text: string, size: number | null, font: string | null): number {
        if (size === null) {
            size = this._fontSize;
        }
        if (font === null) {
            font = this._fontName;
        }
        this.ctx.font = size + `px ` + font;
        return this.ctx.measureText(text).width;
    }

    /**
     * Rendering line
     * @param {number} sx Start x position
     * @param {number} sy Start y position
     * @param {number} ex Terminal x position
     * @param {number} ey Terminal y position
     * @param {string} color Color name of line
     * @param {number} lineWidth Line width
     */
    strokeLine(sx: number, sy: number, ex: number, ey: number, color: string | null, lineWidth: number | null) {
        if (color === null) {
            color = this._lineColor;
        }
        if (lineWidth === null) {
            lineWidth = this._lineWidth;
        }
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = lineWidth;
        this.ctx.beginPath();
        this.ctx.moveTo(sx, sy);
        this.ctx.lineTo(ex, ey);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    /**
     * Rendering circle
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} radius Raius of circle
     * @param {number} startAngle Beginning of arc
     * @param {number} endAngle End of arc
     * @param {boolean} anticlockwise Whether it is clockwise or not
     * @param {string} color Color name of circle
     * @param {number} lineWidth Line of circle width
     */
    strokeCircle(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise: boolean, color: string | null, lineWidth: number | null) {
        if (color === null) {
            color = this._lineColor;
        }
        if (lineWidth === null) {
            lineWidth = this._lineWidth;
        }
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = lineWidth;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    /**
     * Rendering rectangle outline
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {string} color Color name of rectangle
     * @param {number} lineWidth Line of rectangle width
     */
    strokeRect(x: number, y: number, width: number, height: number, color: string | null, lineWidth: number | null) {
        if (color === null) {
            color = this._lineColor;
        }
        if (lineWidth === null) {
            lineWidth = this._lineWidth;
        }
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = lineWidth;
        this.ctx.strokeRect(x, y, width, height);
    }

    /**
     * Rendering rectangle
     * @override
     * @param {number} x Upper left x position
     * @param {number} y Upper left y position
     * @param {number} width Width of the rectangle
     * @param {number} height Height of the rectangle
     * @param {string} color Color name of rectangle
     * @param {number} lineWidth Line of rectangle width
     */
    fillRect(x: number, y: number, width: number, height: number, color: string | null, lineWidth: number | null) {
        if (color === null) {
            color = this._lineColor;
        }
        if (lineWidth === null) {
            lineWidth = this._lineWidth;
        }
        this.ctx.fillStyle = color;
        this.ctx.lineWidth = lineWidth;
        this.ctx.fillRect(x, y, width, height);
    }

    /**
     * Rendering image
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
    drawImage(imageID: ResourceID, x: number, y: number, width: number | null, height: number | null, srcX: number | null, srcY: number | null, srcW: number | null, srcH: number | null) {
        const image = this.image.getImage(imageID);
        if (image != null) {
            x = Math.round(x);
            y = Math.round(y);
            if (width === null || height === null) {
                this.ctx.drawImage(image, x, y);
                return;
            }
            width = Math.round(width);
            height = Math.round(height);
            this.ctx.save();
            if (width < 0) {
                width = -width;
                x = -x - width;
                this.ctx.scale(-1, 1);
            }
            if (height < 0) {
                height = -height;
                y = -y - height;
                this.ctx.scale(1, -1);
            }
            if (srcX === null || srcY === null || srcW === null || srcH === null) {
                this.ctx.drawImage(image, x, y, width, height);
            } else {
                srcX = Math.round(srcX);
                srcY = Math.round(srcY);
                srcW = Math.round(srcW);
                srcH = Math.round(srcH);
                this.ctx.drawImage(image, srcX, srcY, srcW, srcH, x, y, width, height);
            }
            this.ctx.restore();
        }
    }
}

import { Context } from "../../../base/resources/image/Context";
import { ResourceID } from '../../../base/resources/IResourceManager';
import { HTMLUtil } from '../../util/HTMLUtil';

/**
 * - Render by using HTML5 API.
 */
export class CanvasContext extends Context {
    /**
     * Color of the text.
     */
    private mFontColor: string = 'black';
    /**
     * Size of the text.
     */
    private mFontSize: number = 50;
    /**
     * Font name of the text.
     */
    private mFontName: string = 'Arial';

    /**
     * Color of the line.
     */
    private mLineColor: string = 'red';
    /**
     * Size of the line.
     */
    private mLineWidth: number = 1;

    /**
     * Canvas context for rendering
     * @protected
     * @type {CanvasRenderingContext2D}
     */
    protected ctx: CanvasRenderingContext2D = HTMLUtil.getContext2D(this.screen.getCanvas());

    /**
     * @override
     */
    preRendering()
    {
        // ignore antialiasing
        this.ctx.imageSmoothingEnabled = false;
        // save context state
        this.ctx.save();
        // scale rendering size
        this.ctx.scale(this.screen.gameSize, this.screen.gameSize);
        // render background
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.screen.width, this.screen.height);
    }

    /**
     * @override
     */
    postRendering()
    {
        // restore context state
        this.ctx.restore();
    }

    /**
     * @override
     */
    measureText(aText: string, aSize: number = this.mFontSize, aFont: string = this.mFontName): number
    {
        this.ctx.font = `${aSize}px ${aFont}`;
        return this.ctx.measureText(aText).width;
    }

    /**
     * @override
     */
    fillText(
        aText: string, aX: number, aY: number,
        aAnchorX: number = 0, aAnchorY: number = 0,
        aSize: number = this.mFontSize, aColor: string = this.mFontColor,
        aFont: string = this.mFontName
    )
    {
        this.ctx.font = `${aSize}px ${aFont}`;
        this.ctx.fillStyle = aColor;
        this.ctx.fillText(aText, aX - aAnchorX * this.ctx.measureText(aText).width, aY + (1 - aAnchorY) * aSize);
    }

    /**
     * @override
     */
    strokeLine(
        aSrcX: number, aSrcY: number, aDstX: number, aDstY: number,
        aColor: string = this.mLineColor, aLineWidth: number = this.mLineWidth
    )
    {
        this.ctx.strokeStyle = aColor;
        this.ctx.lineWidth = aLineWidth;
        this.ctx.beginPath();
        this.ctx.moveTo(aSrcX, aSrcY);
        this.ctx.lineTo(aDstX, aDstY);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    /**
     * @override
     */
    strokeCircle(
        aX: number, aY: number, aRadius: number, aStartAngle: number, aEndAngle: number, aAnticlockwise: boolean,
        aColor: string = this.mLineColor, aLineWidth: number = this.mLineWidth
    )
    {
        this.ctx.strokeStyle = aColor;
        this.ctx.lineWidth = aLineWidth;
        this.ctx.beginPath();
        this.ctx.arc(aX, aY, aRadius, aStartAngle, aEndAngle, aAnticlockwise);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    /**
     * @override
     */
    strokeRect(
        aX: number, aY: number, aWidth: number, aHeight: number,
        aColor: string = this.mLineColor, aLineWidth: number = this.mLineWidth
    )
    {
        this.ctx.strokeStyle = aColor;
        this.ctx.lineWidth = aLineWidth;
        this.ctx.strokeRect(aX, aY, aWidth, aHeight);
    }

    /**
     * @override
     */
    fillRect(
        aX: number, aY: number, aWidth: number, aHeight: number,
        aColor: string = this.mLineColor, aLineWidth: number = this.mLineWidth
    )
    {
        this.ctx.fillStyle = aColor;
        this.ctx.lineWidth = aLineWidth;
        this.ctx.fillRect(aX, aY, aWidth, aHeight);
    }

    /**
     * @override
     */
    drawImage(
        aImageID: ResourceID, aX: number, aY: number, aWidth?: number, aHeight?: number,
        aSrcX?: number, aSrcY?: number, aSrcW?: number, aSrcH?: number
    )
    {
        const image = this.image.getImage(aImageID);
        if (image != null) {
            // round position
            aX = Math.round(aX);
            aY = Math.round(aY);
            if (aWidth === undefined || aHeight === undefined) {
                this.ctx.drawImage(image, aX, aY);
                return;
            }
            // round size
            aWidth = Math.round(aWidth);
            aHeight = Math.round(aHeight);
            this.ctx.save();
            // reverse
            if (aWidth < 0) {
                aWidth = -aWidth;
                aX = -aX - aWidth;
                this.ctx.scale(-1, 1);
            }
            if (aHeight < 0) {
                aHeight = -aHeight;
                aY = -aY - aHeight;
                this.ctx.scale(1, -1);
            }
            if (aSrcX === undefined || aSrcY === undefined || aSrcW === undefined || aSrcH === undefined) {
                this.ctx.drawImage(image, aX, aY, aWidth, aHeight);
            } else {
                // round source size
                aSrcX = Math.round(aSrcX);
                aSrcY = Math.round(aSrcY);
                aSrcW = Math.round(aSrcW);
                aSrcH = Math.round(aSrcH);
                this.ctx.drawImage(image, aSrcX, aSrcY, aSrcW, aSrcH, aX, aY, aWidth, aHeight);
            }
            this.ctx.restore();
        }
    }
}

import { Context } from "../../../base/resources/image/Context";
import { IImageManager } from "../../../base/resources/IImageManager";
import { GameScreen } from "../../../base/screen/GameScreen";
import { ResourceID } from "../../../base/resources/IResourceManager";

// TODO: Should implements
/**
 * Context for rendering by WebGL
 * - Renders by using WebGL
 * @extends {Context}
 * @classdesc Context for rendering by WebGL
 */
export class GLContext extends Context {
    /**
     * GL context for rendering
     * @private
     * @type {WebGLRenderingContext}
     */
    private _gl: WebGLRenderingContext;


    /**
     * WebGL context constructor
     * @constructor
     * @param {GameScreen} screen Screen to render image
     * @param {IImageManager} image Image manager
     */
    constructor(screen: GameScreen, image: IImageManager) {
        super(screen, image);
        /**
         * GL context for rendering
         * @private
         * @type {WebGLRenderingContext}
         */
        this._gl = this.screen.getCanvas().getContext(`webgl`) as WebGLRenderingContext;
        // dummy
        this._gl.ACTIVE_ATTRIBUTES;
    }

    /**
     * Initialize context
     * @override
     */
    init() { }

    /**
     * Function to be executed before drawing
     * @override
     */
    preRendering() { }

    /**
     * Function to be executed after drawing
     * @override
     */
    postRendering() { }

    /**
     * Get rendering text width
     * @override
     * @param {string} text Rendering text
     * @param {number | null} size Font size
     * @param {string | null} font Font name
     * @return {number} Text width
     */
    measureText(_text: string, _size: number | null, _font: string | null) { return 0; }

    /**
     * Render text
     * @override
     * @param {string} text Rendering text
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number | null} anchorX Anchor x point in percent (0.0 <= anchorX <= 1.0)
     * @param {number | null} anchorY Anchor y point in percent (0.0 <= anchorX <= 1.0)
     * @param {number | null} size Font size
     * @param {string | null} color Font color
     * @param {string | null} font Font name
     */
    fillText(_text: string, _x: number, _y: number, _anchorX: number | null, _anchorY: number | null, _size: number | null, _color: string | null, _font: string | null) { }

    /**
     * Rendering line
     * @override
     * @param {number} sx Start x position
     * @param {number} sy Start y position
     * @param {number} ex Terminal x position
     * @param {number} ey Terminal y position
     * @param {string} color Color name of line
     * @param {number} lineWidth Line width
     */
    strokeLine(_sx: number, _sy: number, _ex: number, _ey: number, _color: string, _lineWidth: number) { }

    /**
     * Rendering circle outline
     * @override
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} radius Raius of circle
     * @param {number} startAngle Beginning of arc
     * @param {number} endAngle End of arc
     * @param {boolean} anticlockwise Whether it is clockwise or not
     * @param {string} color Color name of circle
     * @param {number} lineWidth Line of circle width
     */
    strokeCircle(_x: number, _y: number, _radius: number, _startAngle: number, _endAngle: number, _anticlockwise: boolean, _color: string | null, _lineWidth: number | null) { }

    /**
     * Rendering rectangle outline
     * @override
     * @param {number} x Upper left x position
     * @param {number} y Upper left y position
     * @param {number} width Width of the rectangle
     * @param {number} height Height of the rectangle
     * @param {string} color Color name of rectangle
     * @param {number} lineWidth Line of rectangle width
     */
    strokeRect(_x: number, _y: number, _width: number, _height: number, _color: string | null, _lineWidth: number | null) { }

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
    fillRect(_x: number, _y: number, _width: number, _height: number, _color: string | null, _lineWidth: number | null) { }

    /**
     * Rendering image
     * @override
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
    drawImage(_imageID: ResourceID, _x: number, _y: number, _width: number | null, _height: number | null, _srcX: number | null, _srcY: number | null, _srcW: number | null, _srcH: number | null) { }
}

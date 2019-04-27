import { GameImage } from './../../../base/resources/image/GameImage';
import { ResourceID } from '../../../base/resources/IResourceManager';
import { Context } from '../../../base/resources/image/Context';
/**
 * Game text
 * - Renders text
 * @extends {GameImage}
 * @classdesc Game text to render text
 */
export class GameText extends GameImage {
    /**
     * Rendering text
     * @protected
     * @type {string}
     */
    protected text: string;
    /**
     * Text size
     * @protected
     * @type ?{number}
     */
    protected size?: number;
    /**
     * Text color
     * @protected
     * @type {string}
     */
    protected color?: string;
    /**
     * Text font
     * @protected
     * @type {string}
     */
    protected font?: string;

    /**
     * Image width
     * @protected
     * @type {number}
     */
    protected width?: number;
    /**
     * Image height
     * @protected
     * @type {number}
     */
    protected height?: number;

    /**
     * Game text constructor
     * @constructor
     * @param {string} text Rendering text
     * @param {number} size Text size
     * @param {string} color Text Color
     * @param {string} font Text font
     * @param {number} width Text max width
     */
    constructor(text: string, size?: number, color?: string, font?: string, width?: number) {
        super();
        this.text = text;
        this.size = size;
        this.color = color;
        this.font = font;

        this.width = width;
        this.height = undefined;
    }

    /**
     * Set image size
     * @override
     * @param {number} width Image width
     * @param {number} height Image height
     */
    setSize(width: number, _height: number) {
        this.width = width;
    }

    /**
     * Set image ID
     * @override
     * @param {ResourceID} imageID Image ID
     */
    setImageID(_imageID: ResourceID) { }

    /**
     * Get image ID
     * @abstract
     * @return {ResourceID} Image ID
     */
    getImageID(): ResourceID {
        return 0;
    }

    /**
     * Get image width
     * @override
     * @return {number} Imag width
     */
    getWidth(): number {
        return this.width === undefined ? 0 : this.width;
    }

    /**
     * Get image height
     * @override
     * @return {number} Imag height
     */
    getHeight(): number {
        return this.height === undefined ? 0 : this.height;
    }

    /**
     * Get source offset x position
     * @override
     * @return {number}
     */
    getSourceOffsetX(): number {
        return 0;
    }

    /**
     * Get source offset y position
     * @override
     * @return {number}
     */
    getSourceOffsetY(): number {
        return 0;
    }

    /**
     * Get source width
     * @override
     * @return {number}
     */
    getSourceWidth(): number {
        return this.width === undefined ? -1 : this.width;
    }
    /**
     * Get source height
     * @override
     * @return {number}
     */
    getSourceHeight(): number {
        return this.height === undefined ? -1 : this.height;
    }

    /**
     * Initialize image
     * @override
     */
    init() { }

    /**
     * Update image
     * @override
     * @param {number} dt
     */
    update(_dt: number) { }

    /**
     * Render image
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} x Image x position
     * @param {number} y Image y position
     */
    render(ctx: Context, x: number, y: number) {
        if (this.width !== undefined) {
            // wrap
            const sentences = [];
            let sentence = '';
            for (let i = 0; i < this.text.length; ++i) {
                if (this.width < ctx.measureText(sentence + this.text[i], this.size == null ? undefined : this.size, this.font == null ? undefined : this.font)) {
                    sentences.push(sentence);
                    sentence = this.text[i];
                } else {
                    sentence += this.text[i];
                }
            }
            for (const it of sentences) {
                ctx.fillText(it, x, y, 0.5, 0.5, this.size, this.color, this.font);
            }
            if (this.height === null) {
                // TODO: Get size by context
                // this.height = this.size * sentences.length;
            }
        } else {
            ctx.fillText(this.text, x, y, 0.5, 0.5, this.size, this.color, this.font);
            if (this.height === null) {
                this.height = this.size;
            }
        }
    }
}

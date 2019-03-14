import { GameImage } from './../../../base/resources/image/GameImage';
import { ResourceID } from '../../../base/resources/IResourceManager';
import { Context } from '../../../base/resources/image/Context';
/**
 * Game text
 * - Renders text
 * @extends {GameImage}
 * @classdesc Game text to render text
 */
export class GameText implements GameImage {
    /**
     * Rendering text
     * @protected
     * @type {string}
     */
    text: string;
    /**
     * Text size
     * @protected
     * @type {number | null}
     */
    size: number | null;
    /**
     * Text color
     * @protected
     * @type {string | null}
     */
    color: string | null;
    /**
     * Text font
     * @protected
     * @type {string | null}
     */
    font: string | null;

    /**
     * Image width
     * @protected
     * @type {number | null}
     */
    width: number | null;
    /**
     * Image height
     * @protected
     * @type {number}
     */
    height: number | null;

    /**
     * Game text constructor
     * @constructor
     * @param {string} text Rendering text
     * @param {number} [size=null] Text size
     * @param {string} [color=null] Text Color
     * @param {string} [font=null] Text font
     * @param {number} [width=null] Text max width
     */
    constructor(text: string, size: number | null = null, color: string | null = null, font: string | null = null, width: number | null = null) {
        this.text = text;
        this.size = size;
        this.color = color;
        this.font = font;

        this.width = width;
        this.height = null;
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
        return this.width === null ? 0 : this.width;
    }

    /**
     * Get image height
     * @override
     * @return {number} Imag height
     */
    getHeight(): number {
        return this.height === null ? 0 : this.height;
    }

    /**
     * Get source offset x position
     * @override
     * @protected
     * @type {number}
     */
    getSourceOffsetX() {
        return 0;
    }

    /**
     * Get source offset y position
     * @override
     * @protected
     * @type {number}
     */
    getSourceOffsetY() {
        return 0;
    }

    /**
     * Get source width
     * @override
     * @protected
     * @type {number}
     */
    getSourceWidth() {
        return this.width === null ? -1 : this.width;
    }
    /**
     * Get source height
     * @override
     * @protected
     * @type {number}
     */
    getSourceHeight() {
        return this.height === null ? -1 : this.height;
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
        if (this.width !== null) {
            // wrap
            const sentences = [];
            let sentence = ``;
            for (let i = 0; i < this.text.length; ++i) {
                if (this.width < ctx.measureText(sentence + this.text[i], this.size, this.font)) {
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

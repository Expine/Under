/**
 * Game text
 * - Renders image
 * - ### Renders text
 * @extends {GameImage}
 * @classdesc Game text to render text
 */
class GameText extends GameImage { // eslint-disable-line  no-unused-vars
    /**
     * Game text constructor
     * @constructor
     * @param {string} text Rendering text
     * @param {number} [size=undefined] Text size
     * @param {string} [color=undefined] Text Color
     * @param {string} [font=undefined] Text font
     * @param {number} [width=null] Text max width
     */
    constructor(text, size = undefined, color = undefined, font = undefined, width = null) {
        super();

        /**
         * Rendering text
         * @protected
         * @type {string}
         */
        this.text = text;
        /**
         * Text size
         * @protected
         * @type {number}
         */
        this.size = size;
        /**
         * Text color
         * @protected
         * @type {string}
         */
        this.color = color;
        /**
         * Text font
         * @protected
         * @type {string}
         */
        this.font = font;

        /**
         * Image width
         * @protected
         * @type {number}
         */
        this.width = width;
        /**
         * Image height
         * @protected
         * @type {number}
         */
        this.height = null;
    }

    /**
     * Set image size
     * @override
     * @param {number} width Image width
     * @param {number} height Image height
     */
    setSize(width, height) {
        this.width = width;
    }

    /**
     * Set image ID
     * @override
     * @param {number} imageID Image ID
     */
    setImageID(imageID) {}

    /**
     * Get image ID
     * @abstract
     * @return {number} Image ID
     */
    getImageID() {
        return null;
    }

    /**
     * Get image width
     * @override
     * @return {number} Imag width
     */
    getWidth() {
        return this.width;
    }

    /**
     * Get image height
     * @override
     * @return {number} Imag height
     */
    getHeight() {
        return this.height;
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
     * Render image
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} x Image x position
     * @param {number} y Image y position
     */
    render(ctx, x, y) {
        if (this.width !== null) {
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
                this.height = this.size * sentences.length;
            }
        } else {
            ctx.fillText(this.text, x, y, 0.5, 0.5, this.size, this.color, this.font);
            if (this.height === null) {
                this.height = this.size;
            }
        }
    }
}

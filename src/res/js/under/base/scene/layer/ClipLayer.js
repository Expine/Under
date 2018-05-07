/**
 * Clip layer
 * - Performs drawing processing collectively
 * - ### Clips area when rendering
 * @interface
 * @extends {Layer}
 * @classdesc Clip layer to clip area when rendering
 */
class ClipLayer extends Layer { // eslint-disable-line  no-unused-vars
    /**
     * Clip layer constructor
     * @constructo
     */
    constructor() {
        super();

        /**
         * Clip x position
         * @protected
         * @type {number}
         */
        this.clipX = 0;
        /**
         * Clip y position
         * @protected
         * @type {number}
         */
        this.clipY = 0;
        /**
         * Clip width
         * @protected
         * @type {number}
         */
        this.clipWidth = 0;
        /**
         * Clip height
         * @protected
         * @type {number}
         */
        this.clipHeight = 0;
    }

    /**
     * Clip area
     * @param {number} clipX Cliping x position
     * @param {number} clipY Cliping y position
     * @param {number} clipWidth Cliping width
     * @param {number} clipWidth Cliping height
     */
    clip(clipX, clipY, clipWidth, clipHeight) {
        this.clipX = clipX;
        this.clipY = clipY;
        this.clipWidth = clipWidth;
        this.clipHeight = clipHeight;
    }
}

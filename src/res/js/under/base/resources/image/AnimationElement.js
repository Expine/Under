/**
 * Animation element
 * - ### Having information for animation
 * @classdesc Animation element having information for animation
 */
class AnimationElement { // eslint-disable-line  no-unused-vars
    /**
     * Animation element constructor
     * @constructor
     * @param {number} imageID Image ID of animation
     * @param {number} srcX Upper left x coordinates of animation
     * @param {number} srcY Upper left y coordinates of animation
     * @param {number} srcW Width of animation
     * @param {number} srcH Height of animation
     * @param {number} delta Time to next animation
     */
    constructor(imageID, srcX, srcY, srcW, srcH, delta) {
        /**
         * Image ID of animation
         * @type {number}
         */
        this.imageID = imageID;
        /**
         * Upper left x coordinates of animation
         * @type {number}
         */
        this.srcX = srcX;
        /**
         * Upper left y coordinates of animation
         * @type {number}
         */
        this.srcY = srcY;
        /**
         * Width of animation
         * @type {number}
         */
        this.srcW = srcW;
        /**
         * Height of animation
         * @type {number}
         */
        this.srcH = srcH;

        /**
         * Time to next animation
         * @type {number}
         */
        this.delta = delta;
    }
}

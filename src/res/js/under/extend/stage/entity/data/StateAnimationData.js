/**
 * Elements of animation information for each state
 * @classdesc Elements of animation information for each state
 */
class StateAnimationData { // eslint-disable-line  no-unused-vars
    /**
     * State animation data constructor
     * @constructor
     * @param {string} name State name
     */
    constructor(imageID, srcX, srcY, srcW, srcH) {
        /**
         * Animation image id
         * @type {number}
         */
        this.imageID = imageID;
        /**
         * Top left of animation
         * @type {number}
         */
        this.srcX = srcX;
        /**
         * Top left of animation
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
    }
}

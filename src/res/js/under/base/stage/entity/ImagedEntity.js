/**
 * Imaged entity
 * - Object present on the stage that has coordinate and size
 * - ### Has image ID
 * @implements {Entity}
 * @classdesc Imaged entity to have image ID
 */
class ImagedEntity extends Entity { // eslint-disable-line  no-unused-vars
    /**
     * Imaged entity constructor
     * @constructor
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} width Entity width
     * @param {number} height Entity height
     * @param {number} [imageID=-1] Image ID for rendering (if has not, -1)
     */
    constructor(x, y, width, height, imageID = -1) {
        super(x, y, width, height);

        /**
         * Entity image id
         * @protected
         * @type {number}
         */
        this.imageID = imageID;
    }
}

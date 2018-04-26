/**
 * Imaged entity
 * - Object present on the stage that has coordinate and size
 * - ### Has image ID
 * @interface
 * @implements {Entity}
 * @classdesc Imaged entity to have image ID
 */
class ImagedEntity extends Entity { // eslint-disable-line  no-unused-vars
    /**
     * Imaged entity constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Image ID
         * @protected
         * @type {number}
         */
        this.imageID = -1;
    }
    /**
     * Set image ID
     * @param {number} imageID Image ID
     */
    setImage(imageID) {
        this.imageID = imageID;
    }
}

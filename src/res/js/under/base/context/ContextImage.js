/**
 * Abstract of image to render
 * Provides images managed by ID
 * @classdesc Abstract of image to render
 */
class ContextImage { // eslint-disable-line  no-unused-vars
    /**
     * Context image constructor
     * Set singleton instance
     * @constructor
     */
    constructor() {
        ContextImage.it = this;
    }

    /**
     * Load image and return ID
     * @interface
     * @param {string} filePath image file path
     * @return {number} image ID
     */
    loadImage(filePath) {}

    /**
     * Unload image
     * @interface
     * @param {number} imageID Image ID
     */
    unloadImage(imageID) {}

    /**
     * Get image path
     * @interface
     * @param {number} imageID Image ID
     * @return {string} Image path (return null if not exists)
     */
    getImagePath(imageID) {}

    /**
     * Get image by ID
     * @interface
     * @param {number} id id
     * @return {Image} image
     */
    getImage(id) {}
}

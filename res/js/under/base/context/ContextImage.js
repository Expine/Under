/**
 * Abstract of image to render
 * Provides images managed by ID
 * @classdesc Abstract of image to render
 */
class ContextImage {
    /**
     * Context image constructor
     * Set singleton instance
     * @constructor
     */
    constructor() {
        Context.image = this;
    }

    /**
     * Load image and return ID
     * @interface
     * @param {string} filePath image file path
     * @return {number} image ID
     */
    loadImage(filePath) {}

    /**
     * Get image by ID
     * @interface
     * @param {number} id id
     * @return {Image} image
     */
    getImage(id) {}
}
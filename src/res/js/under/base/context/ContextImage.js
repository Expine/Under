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
     * @param {string} root Resource root path
     */
    constructor(root) {
        ContextImage.it = this;

        /**
         * Resource root path
         * @protected
         * @type {string}
         */
        this.root = root;
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
     * Reload all image
     * @interface
     */
    reload() {}

    /**
     * Get image path
     * @interface
     * @param {number} imageID Image ID
     * @return {string} Image path (return null if not exists)
     */
    getImagePath(imageID) {}

    /**
     * Get image width
     * @param {number} id Image ID
     * @return {number} Image width
     */
    getWidth(id) {}

    /**
     * Get image height
     * @param {number} id Image ID
     * @return {number} Image height
     */
    getHeight(id) {}

    /**
     * Get image by ID
     * @interface
     * @param {number} id id
     * @return {Image} image
     */
    getImage(id) {}
}

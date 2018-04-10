/**
 * Cached image
 * - Resources Abstraction of resource management
 * - Manage resources by array
 * - Resources are cached by file path
 * - It can be acquired information as an image
 * @implements {CachedArrayManager}
 * @implements {IImageManager}
 * @classdesc Cached image that can be acquire as an image
 */
class CachedImage extends CachedArrayManager /* , IImageManager */ { // eslint-disable-line  no-unused-vars
    /**
     * Load resource and return it
     * @override
     * @param {string} filePath Resource file path
     * @return {Object} Resource
     */
    loadResource(filePath) {
        let image = new Image();
        image.src = filePath;
        return image;
    }

    /**
     * Get image width
     * @param {Object} id Image ID
     * @return {number} Image width
     */
    getWidth(id) {
        let image = this.resources[id];
        return image === undefined ? -1 : image.width;
    }

    /**
     * Get image height
     * @param {Object} id Image ID
     * @return {number} Image height
     */
    getHeight(id) {
        let image = this.resources[id];
        return image === undefined ? -1 : image.height;
    }

    /**
     * Get image by ID
     * @override
     * @param {Object} id Image ID
     * @return {Image} Music resource
     */
    getImage(id) {
        return this.resources[id];
    }
}

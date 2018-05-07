/**
 * Image manager interface
 * - Resources abstraction of resource management
 * - ### It can be acquired information as an image
 * @interface
 * @extends {IResourceManager}
 * @classdesc Image manager interface that can be acquired information as image
 */
class IImageManager extends IResourceManager { // eslint-disable-line  no-unused-vars
    /**
     * Get image width
     * @abstract
     * @param {Object} id Image ID
     * @return {number} Image width
     */
    getWidth(id) {}

    /**
     * Get image height
     * @abstract
     * @param {Object} id Image ID
     * @return {number} Image height
     */
    getHeight(id) {}

    /**
     * Get image by ID
     * @abstract
     * @param {Object} id Image ID
     * @return {Image} Music resource
     */
    getImage(id) {}
}

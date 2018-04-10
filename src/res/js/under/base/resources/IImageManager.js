/**
 * Image manager interface
 * - ### It can be acquired information as an image
 * @classdesc Image manager interface that can be acquired information as image
 */
class IImageManager extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Get image width
     * @param {Object} id Image ID
     * @return {number} Image width
     */
    getWidth(id) {}

    /**
     * Get image height
     * @param {Object} id Image ID
     * @return {number} Image height
     */
    getHeight(id) {}

    /**
     * Get image by ID
     * @interface
     * @param {Object} id Image ID
     * @return {Image} Music resource
     */
    getImage(id) {}
}

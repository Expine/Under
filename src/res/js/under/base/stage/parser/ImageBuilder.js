/**
 * Image builder
 * - ### Generates image from json data
 * @interface
 * @classdesc Image builder to generate image from json
 */
class ImageBuilder { // eslint-disable-line  no-unused-vars
    /**
     * Build image from json data
     * @abstract
     * @param {string} root File root path
     * @param {JSON} image Image json data
     * @return {GameImage} image
     */
    build(root, image) {}
}

/**
 * Image manager to render by JavaScript
 * Manage images by array
 * Images are cached by pass
 * @implements {ContextImage}
 * @classdesc Image manager to render by JavaScript
 */
class CachedImage extends ContextImage { // eslint-disable-line  no-unused-vars
    /**
     * JavaScript cached image constructor
     * @constructor
     */
    constructor() {
        super();
        /**
         * Image array
         * @private
         * @type {Array<Image>}
         */
        this.images_ = [];

        /**
         * Cached image array
         * @private
         * @type {Dictionary<string, number>}
         */
        this.caches_ = {};
    }

    /**
     * Load image and return ID
     * @override
     * @param {string} filePath image file path
     * @return {number} image ID
     */
    loadImage(filePath) {
        let cache = this.caches_[filePath];
        if (cache !== undefined) {
            return cache;
        }
        let image = new Image();
        image.src = filePath;
        this.images_.push(image);
        return this.caches_[filePath] = this.images_.length - 1;
    }

    /**
     * Unload image
     * @override
     * @param {number} imageID Image ID
     */
    unloadImage(imageID) {
        // TODO: Should be implemented
    }

    /**
     * Get image by ID
     * @override
     * @param {number} id id
     * @return {Image} image
     */
    getImage(id) {
        return this.images_[id];
    }
}

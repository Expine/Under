/**
 * Image manager to render by JavaScript
 * Manage images by array
 * Images are cached by pass
 */
class JSCachedImage extends ContextImage { // eslint-disable-line  no-unused-vars
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
     * @interface
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
        return this.images_.length - 1;
    }


    /**
     * Get image by ID
     * @interface
     * @param {number} id id
     * @return {Image} image
     */
    getImage(id) {
        return this.images_[id];
    }
}

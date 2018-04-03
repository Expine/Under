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
     * @param {string} root Resource root path
     */
    constructor(root) {
        super(root);
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
        // append root
        if (!filePath.startsWith(this.root)) {
            filePath = this.root + filePath;
        }
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
     * Reload all image
     * @override
     */
    reload() {
        for (let it in this.caches_) {
            if (this.caches_.hasOwnProperty(it)) {
                let image = new Image();
                image.src = `${it}?time=${new Date()}`;
                this.images_[this.caches_[it]] = image;
            }
        }
    }

    /**
     * Get image path
     * @override
     * @param {number} imageID Image ID
     * @return {string} Image path (return null if not exists)
     */
    getImagePath(imageID) {
        for (let path in this.caches_) {
            if (this.caches_.hasOwnProperty(path)) {
                if (this.caches_[path] == imageID) {
                    return path.replace(this.root, ``);
                }
            }
        }
        return null;
    }

    /**
     * Get image width
     * @param {number} id Image ID
     * @return {number} Image width
     */
    getWidth(id) {
        let image = this.images_[id];
        return image === undefined ? -1 : image.width;
    }

    /**
     * Get image height
     * @param {number} id Image ID
     * @return {number} Image height
     */
    getHeight(id) {
        let image = this.images_[id];
        return image === undefined ? -1 : image.height;
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

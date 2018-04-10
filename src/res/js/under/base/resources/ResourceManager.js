/**
 * Resource manager
 * - ### Resources Abstraction of resource management
 * @classdesc Resource manager that indicatas abstraction of resource management
 */
class ResourceManager { // eslint-disable-line  no-unused-vars
    /**
     * Resource manager constructor
     * @param {string} root Resource root path
     */
    constructor(root) {
        /**
         * Resource root path
         * @protected
         * @type {string}
         */
        this.root = root;

        // set singleton
        if (BaseUtil.implementsOf(this, IImageManager)) {
            ResourceManager.image = this;
        } else if (BaseUtil.implementsOf(this, IMusicManager)) {
            ResourceManager.music = this;
        }
    }

    /**
     * Load resource and return ID
     * @interface
     * @param {string} filePath Resource file path
     * @return {Object} Resource ID
     */
    load(filePath) {}

    /**
     * Unload resource
     * @interface
     * @param {Object} id Resource ID
     */
    unload(id) {}

    /**
     * Reload all resources
     * @interface
     */
    reload() {}

    /**
     * Get resource path
     * @interface
     * @param {Object} id Resrouce ID
     * @return {string} Resource path (return null if not exists)
     */
    getPath(id) {}
}

/**
 * Image resource manager instance for singleton
 * @static
 * @type {ResourceManager}
 */
ResourceManager.image = null;
/**
 * Music resource manager instance for singleton
 * @static
 * @type {ResourceManager}
 */
ResourceManager.music = null;

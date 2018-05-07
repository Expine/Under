/**
 * Resource manager interface
 * - ### Resources abstraction of resource management
 * @interface
 * @classdesc Resource manager interface that indicatas abstraction of resource management
 */
class IResourceManager extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Load resource and return ID
     * @abstract
     * @param {string} filePath Resource file path
     * @return {Object} Resource ID
     */
    load(filePath) {}

    /**
     * Unload resource
     * @abstract
     * @param {Object} id Resource ID
     */
    unload(id) {}

    /**
     * Reload all resources
     * @abstract
     */
    reload() {}

    /**
     * Get resource path
     * @abstract
     * @param {Object} id Resrouce ID
     * @return {string} Resource path (return null if not exists)
     */
    getPath(id) {}
}

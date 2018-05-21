/**
 * Cached array manager
 * - Resources Abstraction of resource management
 * - ### Manage resources by array
 * - ### Resources are cached by file path
 * @interface
 * @extends {ResourceManager}
 * @classdesc Cached array manager to manage resources by array and cached by file path
 */
class CachedArrayManager extends ResourceManager { // eslint-disable-line  no-unused-vars
    /**
     * Cached array constructor
     * @constructor
     * @param {string} root Resource root path
     */
    constructor(root) {
        super(root);

        /**
         * Resources array
         * @protected
         * @type {Array<Object>}
         */
        this.resources = [];

        /**
         * Cached image array
         * @protected
         * @type {Object<string, Object>}
         */
        this.caches = {};
    }

    /**
     * Load resource and return it
     * @abstract
     * @param {string} filePath Resource file path
     * @return {Object} Resource
     */
    loadResource(filePath) {}

    /**
     * Load resource and return ID
     * @override
     * @param {string} filePath Resource file path
     * @return {number} Resource ID
     */
    load(filePath) {
        // append root
        if (!filePath.startsWith(this.root)) {
            filePath = this.root + filePath;
        }
        const cache = this.caches[filePath];
        if (cache !== undefined) {
            return cache;
        }
        this.resources.push(this.loadResource(filePath));
        return this.caches[filePath] = this.resources.length - 1;
    }

    /**
     * Unload resource
     * @override
     * @param {Object} id Resource ID
     */
    unload(id) {
        delete this.caches[this.getPath(id)];
        this.resources.splice(index, 1, null);
    }

    /**
     * Reload all resources
     * @override
     */
    reload() {
        for (const it in this.caches) {
            if (this.caches.hasOwnProperty(it)) {
                this.resources[this.caches[it]] = this.loadResource(`${it}?time=${new Date()}`);
            }
        }
    }

    /**
     * Get resource path
     * @override
     * @param {Object} id Resrouce ID
     * @return {string} Resource path (return null if not exists)
     */
    getPath(id) {
        for (const path in this.caches) {
            if (this.caches.hasOwnProperty(path)) {
                if (this.caches[path] === id) {
                    return path.replace(this.root, ``);
                }
            }
        }
        return null;
    }
}

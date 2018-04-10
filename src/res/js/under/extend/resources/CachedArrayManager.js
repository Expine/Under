/**
 * Cached array manager
 * - Resources Abstraction of resource management
 * - ### Manage resources by array
 * - ### Resources are cached by file path
 * @implements {ResourceManager}
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
         * @type {Dictionary<string, Object>}
         */
        this.caches = {};
    }

    /**
     * Load resource and return it
     * @interface
     * @param {string} filePath Resource file path
     * @return {Object} Resource
     */
    loadResource(filePath) {}

    /**
     * Load resource and return ID
     * @override
     * @param {string} filePath Resource file path
     * @return {Object} Resource ID
     */
    load(filePath) {
        // append root
        if (!filePath.startsWith(this.root)) {
            filePath = this.root + filePath;
        }
        let cache = this.caches[filePath];
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
        for (let it in this.caches) {
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
        for (let path in this.caches) {
            if (this.caches.hasOwnProperty(path)) {
                if (this.caches[path] == id) {
                    return path.replace(this.root, ``);
                }
            }
        }
        return null;
    }
}

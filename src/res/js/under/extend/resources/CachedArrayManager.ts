import { ResourceManager } from "../../base/resources/ResourceManager";
import { ResourceID } from "../../base/resources/IResourceManager";

/**
 * Type of resource data
 */
export type ResourceData = HTMLImageElement | AudioBufferSourceNode | null;

/**
 * Cached array manager
 * - Manage resources by array
 * - Resources are cached by file path
 * @abstract
 * @extends {ResourceManager}
 * @classdesc Cached array manager to manage resources by array and cached by file path
 */
export abstract class CachedArrayManager extends ResourceManager {
    /**
     * Resources array
     * @protected
     * @type {Array<ResourceData>}
     */
    protected resources: Array<ResourceData>;

    /**
     * Cached image array
     * @protected
     * @type {Object<string, ResourceID>}
     */
    protected caches: { [s: string]: ResourceID; };

    /**
     * Cached array constructor
     * @constructor
     * @param {string} root Resource root path
     */
    constructor(root: string) {
        super(root);

        this.resources = [];
        this.caches = {};
    }

    /**
     * Load resource and return it
     * @abstract
     * @param {string} filePath Resource file path
     * @return {Object} Resource
     */
    abstract loadResource(filePath: string): ResourceData;

    /**
     * Load resource and return ID
     * @override
     * @param {string} filePath Resource file path
     * @return {ResourceID} Resource ID
     */
    load(filePath: string): ResourceID {
        // append root
        if (!filePath.startsWith(this.root)) {
            filePath = this.root + filePath;
        }
        const cache = this.caches[filePath];
        if (cache !== undefined) {
            return cache;
        }
        this.resources.push(this.loadResource(filePath));
        this.caches[filePath] = this.resources.length - 1;
        return this.caches[filePath];
    }

    /**
     * Unload resource
     * @override
     * @param {ResourceID} id Resource ID
     */
    unload(id: ResourceID) {
        const path = this.getPath(id);
        if (path != null) {
            const idx = this.caches[path] as number;
            delete this.caches[path];
            this.resources.splice(idx, 1);
        }
    }

    /**
     * Reload all resources
     * @override
     */
    reload() {
        for (const it in this.caches) {
            if (this.caches.hasOwnProperty(it)) {
                this.resources[this.caches[it] as number] = this.loadResource(`${it}?time=${new Date()}`);
            }
        }
    }

    /**
     * Get resource path
     * @override
     * @param {ResourceID} id Resrouce ID
     * @return {string?} Resource path (return null if not exists)
     */
    getPath(id: ResourceID): string | null {
        for (const path in this.caches) {
            if (this.caches.hasOwnProperty(path)) {
                if (this.caches[path] === id) {
                    return path.replace(this.root, '');
                }
            }
        }
        return null;
    }
}

import { IMusicManager, isIMusicManager } from './IMusicManager';
import { IImageManager, isIImageManager } from './IImageManager';
import { IResourceManager, ResourceID } from './IResourceManager';
/**
 * Resource manager
 * - Manages resource and root path
 * @interface
 * @implements {IResourceManager}
 * @classdesc Resource manager to manage resource and root path
 */
export abstract class ResourceManager implements IResourceManager {
    /**
     * Image resource manager instance for singleton
     * @static
     * @type {IImageManager}
     */
    static image: IImageManager;
    /**
     * Music resource manager instance for singleton
     * @static
     * @type {IMusicManager}
     */
    static music: IMusicManager;

    /**
     * Resource root path
     * @protected
     * @type {string}
     */
    protected root: string;

    /**
     * Resource manager constructor
     * @param {string} root Resource root path
     */
    constructor(root: string) {
        this.root = root;

        // set singleton
        if (isIImageManager(this)) {
            ResourceManager.image = this;
        }
        if (isIMusicManager(this)) {
            ResourceManager.music = this;
        }
    }

    /**
     * Load resource and return ID
     * @abstract
     * @param {string} filePath Resource file path
     * @return {ResourceID} Resource ID
     */
    abstract load(filePath: string): ResourceID;

    /**
     * Unload resource
     * @abstract
     * @param {ResourceID} id Resource ID
     */
    abstract unload(id: ResourceID): void;

    /**
     * Reload all resources
     * @abstract
     */
    abstract reload(): void;

    /**
     * Get resource path
     * @abstract
     * @param {ResourceID} id Resrouce ID
     * @return {string?} Resource path (return null if not exists)
     */
    abstract getPath(id: ResourceID): string | null;
}

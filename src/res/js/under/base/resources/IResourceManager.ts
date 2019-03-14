/**
 * Type of resource ID
 */
export type ResourceID = number | string;

/**
 * Resource manager interface
 * - Resources abstraction of resource management
 * @interface
 * @classdesc Resource manager interface that indicatas abstraction of resource management
 */
export interface IResourceManager {
    /**
     * Load resource and return ID
     * @abstract
     * @param {string} filePath Resource file path
     * @return {ResourceID} Resource ID
     */
    load(filePath: string): ResourceID;

    /**
     * Unload resource
     * @abstract
     * @param {ResourceID} id Resource ID
     */
    unload(id: ResourceID): void;

    /**
     * Reload all resources
     * @abstract
     */
    reload(): void;

    /**
     * Get resource path
     * @abstract
     * @param {ResourceID} id Resrouce ID
     * @return {string?} Resource path (return null if not exists)
     */
    getPath(id: ResourceID): string | null;
}

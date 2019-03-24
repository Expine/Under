import { IResourceManager, ResourceID } from './IResourceManager';
/**
 * Image manager interface
 * - It can be acquired information as an image
 * @interface
 * @extends {IResourceManager}
 * @classdesc Image manager interface that can be acquired information as image
 */
export interface IImageManager extends IResourceManager {
    /**
     * Get image width
     * @abstract
     * @param {ResourceID} id Image ID
     * @return {number} Image width
     */
    getWidth(id: ResourceID): number;

    /**
     * Get image height
     * @abstract
     * @param {ResourceID} id Image ID
     * @return {number} Image height
     */
    getHeight(id: ResourceID): number;

    /**
     * Get image by ID
     * @abstract
     * @param {ResourceID} id Image ID
     * @return {HTMLImageElement?} Image resource
     */
    getImage(id: ResourceID): HTMLImageElement | null;
}

/**
 * Type guard for IImageManager
 */
export const isIImageManager = (arg: any): arg is IImageManager => arg !== null && arg.getImage !== undefined;

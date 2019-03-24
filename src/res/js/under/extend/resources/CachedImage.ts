import { IImageManager } from './../../base/resources/IImageManager';
import { CachedArrayManager, ResourceData } from "./CachedArrayManager";
import { ResourceID } from '../../base/resources/IResourceManager';

/**
 * Cached image
 * - Manages image resources
 * @extends {CachedArrayManager}
 * @implements {IImageManager}
 * @classdesc Cached image to manage image resources
 */
export class CachedImage extends CachedArrayManager implements IImageManager {
    /**
     * Load resource and return it
     * @override
     * @param {string} filePath Resource file path
     * @return {ResourceData} Resource
     */
    loadResource(filePath: string): ResourceData {
        const image = new Image();
        image.src = filePath;
        return image;
    }

    /**
     * Get image width
     * @param {ResourceID} id Image ID
     * @return {number} Image width
     */
    getWidth(id: ResourceID): number {
        const image = this.resources[id as number] as HTMLImageElement;
        return image === undefined ? -1 : image.width;
    }

    /**
     * Get image height
     * @param {ResourceID} id Image ID
     * @return {number} Image height
     */
    getHeight(id: ResourceID): number {
        const image = this.resources[id as number] as HTMLImageElement;
        return image === undefined ? -1 : image.height;
    }

    /**
     * Get image by ID
     * @override
     * @param {ResourceID} id Image ID
     * @return {HTMLImageElement?} Music resource
     */
    getImage(id: ResourceID): HTMLImageElement | null {
        const ret = this.resources[id as number] as HTMLImageElement;
        return ret === undefined ? null : ret;
    }
}

import { IResourceManager, ResourceID } from './IResourceManager';
/**
 * Music manager interface
 * - It can be acquired information as an music
 * @interface
 * @extends {IResourceManager}
 * @classdesc Music manager interface that can be acquired information as music
 */
export interface IMusicManager extends IResourceManager {
    /**
     * Get music by ID
     * @abstract
     * @param {ResourceID} id Music ID
     * @return {AudioBufferSourceNode?} Music resource
     */
    getMusic(id: ResourceID): AudioBufferSourceNode | null;
}

/**
 * Type guard for IMusicManager
 */
export const isIMusicManager = (arg: any): arg is IMusicManager => arg.getMusic !== undefined;

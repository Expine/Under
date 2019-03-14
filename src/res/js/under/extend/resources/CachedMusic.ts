import { IMusicManager } from './../../base/resources/IMusicManager';
import { CachedArrayManager } from "./CachedArrayManager";
import { ResourceID } from '../../base/resources/IResourceManager';

/**
 * Cached music
 * - Manages music resources
 * @extends {CachedArrayManager}
 * @implements {IMusicManager}
 * @classdesc Cached music to manage music resources
 */
export class CachedMusic extends CachedArrayManager implements IMusicManager {
    /**
     * Audio context
     * @protectedd
     * @type {AudioContext}
     */
    protected context: AudioContext;

    /**
     * Cached music constructor
     * @constructor
     * @param {string} root Resource root path
     */
    constructor(root: string) {
        super(root);

        // window.AudioContext = window.AudioContext || window.webkitAudioContext;
        this.context = new AudioContext();
    }

    /**
     * Load resource and return it
     * @override
     * @param {string} filePath Resource file path
     * @return {Object} Resource
     */
    loadResource(filePath: string): object {
        const id = this.resources.length;
        const instance = this;
        const request = new XMLHttpRequest();
        request.open('GET', filePath, true);
        request.responseType = 'arraybuffer';
        request.onload = function () {
            // status ===0 is local
            if (request.status === 200 || request.status === 0) {
                instance.context.decodeAudioData(request.response, function (buffer) {
                    const source = instance.context.createBufferSource();
                    source.buffer = buffer;
                    source.connect(instance.context.destination);
                    source.loop = true;
                    instance.resources[id] = source;
                });
            }
        };
        request.send();
        return {};
    }

    /**
     * Get music by ID
     * @param {ResourceID} id Music ID
     * @return {AudioBufferSourceNode?} Music resource
     */
    getMusic(id: ResourceID): AudioBufferSourceNode | null {
        const music = this.resources[id as number] as AudioBufferSourceNode;
        return music === undefined ? null : music;
    }
}

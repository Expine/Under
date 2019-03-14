import { IMusicManager } from './../IMusicManager';
import { ResourceID } from '../IResourceManager';
/**
 * Music
 * - Control to play music as BGM or SE
 * @abstract
 * @classdesc Music to control to play music as BGM or SE
 */
export abstract class Music {
    /**
     * Instance for singleton
     * @static
     * @type {Music}
     */
    static it: Music;

    /**
     * Music manager
     * @protected
     * @type {IMusicManager}
     */
    protected music: IMusicManager;

    /**
     * Music constructor
     * @constructor
     * @param {IMusicManager} music Music manager
     */
    constructor(music: IMusicManager) {
        this.music = music;

        // set singleton
        Music.it = this;
    }

    /**
     * Sound the SE
     * @abstract
     * @param {ResourceID} musicID SE Music id
     */
    abstract playSE(musicID: ResourceID): void;

    /**
     * Sound the BGM
     * @abstract
     * @param {ResourceID} musicID BGM Music id
     */
    abstract playBGM(musicID: ResourceID): void;

    /**
     * Pause BGM
     * @abstract
     */
    abstract pauseBGM(): void;

    /**
     * Resume BGM
     * @abstract
     */
    abstract resumeBGM(): void;

    /**
     * Stop BGM
     * @abstract
     */
    abstract stopBGM(): void;
}

import { IMusicManager } from './../../../base/resources/IMusicManager';
import { Music } from "../../../base/resources/music/Music";
import { ResourceID } from '../../../base/resources/IResourceManager';

/**
 * Buffer source music
 * - Playback as buffer source
 * - If music is not loaded, it will be played later
 * @extends {Music}
 * @classdesc Buffer source music to play sound by buffer source
 */
export class BufferSourceMusic extends Music {
    /**
     * Currently playing BGM
     * @protected
     * @type {AudioBufferSourceNode}
     */
    protected bgm: AudioBufferSourceNode | null;

    /**
    * Buffer source music constructor
    * @constructor
     * @param {IMusicManager} music Music manager
    */
    constructor(music: IMusicManager) {
        super(music);

        this.bgm = null;
    }
    /**
     * Play sound
     * @private
     * @param {ResourceID} musicID SE Music id
     * @param {boolean} loop Whether sound is loop or not
     * @return {AudioBufferSourceNode?} Playing sound
     */
    private _play(musicID: ResourceID, loop: boolean): AudioBufferSourceNode | null {
        const music = this.music.getMusic(musicID);
        if (music !== null) {
            music.loop = loop;
            music.start(0);
        } else {
            const instance = this;
            const id = setInterval(() => {
                const music = instance.music.getMusic(musicID);
                if (music !== null) {
                    this._play(musicID, loop);
                    clearInterval(id);
                    if (loop) {
                        this.bgm = music;
                    }
                }
            }, 1000 / 60);
        }
        return music;
    }

    /**
     * Sound the SE
     * @override
     * @param {ResourceID} musicID SE Music id
     */
    playSE(musicID: ResourceID) {
        this._play(musicID, false);
    }

    /**
     * Sound the BGM
     * @override
     * @param {ResourceID} musicID BGM Music id
     */
    playBGM(musicID: ResourceID) {
        if (this.bgm !== null) {
            this.stopBGM();
        }
        this.bgm = this._play(musicID, true);
    }

    /**
     * Pause BGM
     * @override
     */
    pauseBGM() {
        // TODO: Should be implemented
    }

    /**
     * Resume BGM
     * @override
     */
    resumeBGM() {
        // TODO: Should be implemented
    }

    /**
     * Stop BGM
     * @override
     */
    stopBGM() {
        if (this.bgm !== null) {
            this.bgm.stop();
        }
    }
}

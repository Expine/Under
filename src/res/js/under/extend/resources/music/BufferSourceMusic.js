/**
 * Buffer source music
 * - Control to play music as BGM or SE
 * - ### Playback as buffer source
 * - ### If music is not loaded, it will be played later
 * @extends {Music}
 * @classdesc Buffer source music to play sound by buffer source
 */
class BufferSourceMusic extends Music { // eslint-disable-line  no-unused-vars
    /**
     * Buffer source music constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Currently playing BGM
         * @protected
         * @type {AudioBufferSourceNode}
         */
        this.bgm = null;
    }
    /**
     * Play sound
     * @private
     * @param {number} musicID SE Music id
     * @param {boolean} loop Whether sound is loop or not
     * @return {AudioBufferSourceNode} Playing sound
     */
    _play(musicID, loop) {
        let music = this.music.getMusic(musicID);
        if (music !== undefined) {
            if (music === null) {
                let instance = this;
                let id = setInterval(() => {
                    let music = instance.music.getMusic(musicID);
                    if (music !== null) {
                        this._play(musicID, loop);
                        clearInterval(id);
                        if (loop) {
                            this.bgm = music;
                        }
                    }
                }, 1000 / 60);
            } else {
                music.loop = loop;
                music.start(0);
            }
        }
        return music;
    }

    /**
     * Sound the SE
     * @override
     * @param {number} musicID SE Music id
     */
    playSE(musicID) {
        this._play(musicID, false);
    }

    /**
     * Sound the BGM
     * @override
     * @param {number} musicID BGM Music id
     */
    playBGM(musicID) {
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

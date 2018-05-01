/**
 * Buffer source music
 * - Control to play music as BGM or SE
 * - ### Playback as buffer source
 * - ### If music is not loaded, it will be played later
 * @implements {Music}
 * @classdesc Buffer source music to play sound by buffer source
 */
class BufferSourceMusic extends Music { // eslint-disable-line  no-unused-vars
    /**
     * Play sound
     * @private
     * @param {number} musicID SE Music id
     * @param {boolean} loop Whether sound is loop or not
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
                    }
                }, 1000 / 60);
            } else {
                music.loop = loop;
                music.start(0);
            }
        }
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
        this._play(musicID, true);
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
        // TODO: Should be implemented
    }
}

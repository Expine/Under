/**
 * Music
 * - ### Control to play music as BGM or SE
 * @interface
 * @classdesc Music to control to play music as BGM or SE
 */
class Music { // eslint-disable-line  no-unused-vars
    /**
     * Music constructor
     * @constructor
     */
    constructor() {
        /**
         * Music manager
         * @protected
         * @type {IMusicManager}
         */
        this.music = null;

        // set singleton
        Music.it = this;
    }

    /**
     * Set music manager
     * @param {IMusicManager} musicManager Music manager
     */
    setMusicManager(musicManager) {
        this.music = musicManager;
    }

    /**
     * Sound the SE
     * @abstract
     * @param {Object} musicID SE Music id
     */
    playSE(musicID) {}

    /**
     * Sound the BGM
     * @abstract
     * @param {Object} musicID BGM Music id
     */
    playBGM(musicID) {}

    /**
     * Pause BGM
     * @abstract
     */
    pauseBGM() {}

    /**
     * Resume BGM
     * @abstract
     */
    resumeBGM() {}

    /**
     * Stop BGM
     * @abstract
     */
    stopBGM() {}
}

/**
 * Instance for singleton
 * @static
 * @type {Music}
 */
Music.it = null;

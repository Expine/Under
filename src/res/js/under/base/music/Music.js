/**
 * Music system
 * Manages music resources
 * Also manages music playback and so on
 * @classdesc Music system for managing music resources
 */
class Music { // eslint-disable-line  no-unused-vars
    /**
     * Music constructor
     * @constructor
     */
    constructor() {
        // set singleton instance
        Music.it = this;
    }

    /**
     * Load music and return ID
     * @interface
     * @param {string} filePath music file path
     * @return {number} music ID
     */
    loadMusic(filePath) {}

    /**
     * Unload music
     * @interface
     * @param {number} musicID Music ID
     */
    unloadMusic(musicID) {}

    /**
     * Sound the SE
     * @interface
     * @param {number} musicID SE Music id
     */
    playSE(musicID) {}

    /**
     * Sound the BGM
     * @interface
     * @param {number} musicID BGM Music id
     */
    playBGM(musicID) {}

    /**
     * Pause BGM
     * @interface
     */
    pauseBGM() {}

    /**
     * Resume BGM
     * @interface
     */
    resumeBGM() {}

    /**
     * Stop BGM
     * @interface
     */
    stopBGM() {}
}

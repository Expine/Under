/**
 * Music system
 * Manages music resources
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
}

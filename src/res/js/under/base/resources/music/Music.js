/**
 * Music
 * - ### Control to play music as BGM or SE
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

        /**
         * Instance for singleton
         * @static
         * @type {Music}
         */
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

/**
 * Music system
 * Manages music resources
 * Uses XMLHttpRequest
 * @implements {Music}
 * @classdesc Music system for managing music resources
 */
class XHTMLMusic extends Music { // eslint-disable-line  no-unused-vars
    /**
     * XHTML Music constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Music resource
         * If loading has not been completed, null
         * @private
         * @type {Array<BufferSource>}
         */
        this.music_ = [];

        /**
         * A list of BGM that could not be played due to insufficient loading
         * @private
         * @type {Array<number>}
         */
        this.bgmList_ = [];

        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        /**
         * Audio context
         * @type {AudioContext}
         */
        this.context_ = new AudioContext();
    }

    /**
     * Load music and return ID
     * @override
     * @param {string} filePath music file path
     * @return {number} music ID
     */
    loadMusic(filePath) {
        let id = this.music_.length;
        this.music_.push(null);
        let instance = this;
        let request = new XMLHttpRequest();
        request.open('GET', filePath, true);
        request.responseType = 'arraybuffer';
        request.onload = function() {
            if (request.status == 200 /* For local*/ || request.status == 0) {
                instance.context_.decodeAudioData(request.response, function(buffer) {
                    let source = instance.context_.createBufferSource();
                    source.buffer = buffer;
                    source.connect(instance.context_.destination);
                    source.loop = true;
                    instance.music_[id] = source;
                    // if BGM can not be played, play it
                    for (let it of instance.bgmList_) {
                        if (it == id) {
                            instance.bgmList_.splice(instance.bgmList_.indexOf(it), 1);
                            instance.playBGM(it);
                            break;
                        }
                    }
                });
            }
        };
        request.send();
        return id;
    }

    /**
     * Unload music
     * @override
     * @param {number} musicID Music ID
     */
    unloadMusic(musicID) {
        // TODO: Should be implemented
    }

    /**
     * Sound the SE
     * @override
     * @param {number} musicID SE Music id
     */
    playSE(musicID) {
        let se = this.music_[musicID];
        if (se != null) {
            se.loop = false;
            se.start(0);
        }
    }

    /**
     * Sound the BGM
     * @override
     * @param {number} musicID BGM Music id
     */
    playBGM(musicID) {
        let bgm = this.music_[musicID];
        if (bgm != null) {
            bgm.loop = true;
            bgm.start(0);
        } else {
            this.bgmList_.push(musicID);
        }
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

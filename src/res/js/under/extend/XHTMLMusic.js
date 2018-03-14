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
         * @type {Array<BufferSource>}
         */
        this.music = [];

        /**
         * A list of BGM that could not be played due to insufficient loading
         * @type {Array<number>}
         */
        this.bgmList = [];

        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        this.context = new AudioContext();
    }

    /**
     * Load music and return ID
     * @override
     * @param {string} filePath music file path
     * @return {number} music ID
     */
    loadMusic(filePath) {
        let id = this.music.length;
        this.music.push(null);
        let instance = this;
        let request = new XMLHttpRequest();
        request.open('GET', filePath, true);
        request.responseType = 'arraybuffer';
        request.onload = function() {
            if (request.status == 200 /* For local*/ || request.status == 0) {
                instance.context.decodeAudioData(request.response, function(buffer) {
                    let source = instance.context.createBufferSource();
                    source.buffer = buffer;
                    source.connect(instance.context.destination);
                    source.loop = true;
                    instance.music[id] = source;
                    // if BGM can not be played, play it
                    for (let it of instance.bgmList) {
                        if (it == id) {
                            instance.bgmList.splice(instance.bgmList.indexOf(it), 1);
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
     * Sound the SE
     * @override
     * @param {number} musicID SE Music id
     */
    playSE(musicID) {
        let se = this.music[musicID];
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
        let bgm = this.music[musicID];
        if (bgm != null) {
            bgm.loop = true;
            bgm.start(0);
        } else {
            this.bgmList.push(musicID);
        }
    }
}

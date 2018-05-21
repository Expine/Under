/**
 * Cached music
 * - Resources Abstraction of resource management
 * - Manage resources by array
 * - Resources are cached by file path
 * - It can be acquired information as an music
 * - ### Manages music resources
 * @extends {CachedArrayManager}
 * @implements {IMusicManager}
 * @classdesc Cached music to manage music resources
 */
class CachedMusic extends CachedArrayManager /* , IMusicManager */ { // eslint-disable-line  no-unused-vars
    /**
     * Cached music constructor
     * @constructor
     * @param {string} root Resource root path
     */
    constructor(root) {
        super(root);

        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        /**
         * Audio context
         * @protectedd
         * @type {AudioContext}
         */
        this.context = new AudioContext();
    }
    /**
     * Load resource and return it
     * @override
     * @param {string} filePath Resource file path
     * @return {Object} Resource
     */
    loadResource(filePath) {
        const id = this.resources.length;
        const instance = this;
        const request = new XMLHttpRequest();
        request.open('GET', filePath, true);
        request.responseType = 'arraybuffer';
        request.onload = function() {
            // status ===0 is local
            if (request.status === 200 || request.status === 0) {
                instance.context.decodeAudioData(request.response, function(buffer) {
                    const source = instance.context.createBufferSource();
                    source.buffer = buffer;
                    source.connect(instance.context.destination);
                    source.loop = true;
                    instance.resources[id] = source;
                });
            }
        };
        request.send();
        return null;
    }

    /**
     * Get music by ID
     * @param {Object} id Music ID
     * @return {BufferSource} Music resource
     */
    getMusic(id) {
        const music = this.resources[id];
        return music === undefined ? null : music;
    }
}

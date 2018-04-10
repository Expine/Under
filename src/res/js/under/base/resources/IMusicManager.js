/**
 * Music manager interface
 * - ### It can be acquired information as an music
 * @classdesc Music manager interface that can be acquired information as music
 */
class IMusicManager extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Get music by ID
     * @interface
     * @param {Object} id Music ID
     * @return {BufferSource} Music resource
     */
    getMusic(id) {}
}

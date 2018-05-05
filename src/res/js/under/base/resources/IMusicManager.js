/**
 * Music manager interface
 * - Resources abstraction of resource management
 * - ### It can be acquired information as an music
 * @interface
 * @extends {IResouceManager}
 * @classdesc Music manager interface that can be acquired information as music
 */
class IMusicManager extends IResouceManager { // eslint-disable-line  no-unused-vars
    /**
     * Get music by ID
     * @abstract
     * @param {Object} id Music ID
     * @return {BufferSource} Music resource
     */
    getMusic(id) {}
}

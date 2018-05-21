/**
 * Editor function interface
 * - ### Operates editor
 * @interface
 * @classdesc Editor function interface to operate editor
 */
class IEditorFunction extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Get editor target
     * @abstract
     * @protected
     * @return {IEditorTarget} Editor target
     */
    getTarget() {}

    /**
     * Change editor tool by name
     * @abstract
     * @protected
     * @param {string} name Tool name
     */
    changeTool(name) {}

    /**
     * Set current ID
     * @abstract
     * @protected
     * @param {number} id Setting ID
     */
    setCurrentID(id) {}

    /**
     * Get current ID
     * @abstract
     * @protected
     * @return {number} Current ID
     */
    getCurrentID(id) {}
}

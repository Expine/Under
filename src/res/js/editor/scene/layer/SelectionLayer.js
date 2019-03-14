// TODO: Make the selection system more uniform
/**
 * Selection layer
 * - Performs drawing processing collectively
 * - Clips area when rendering
 * - Selects something and set selected
 * - It can save data
 * - ### Selects something
 * @interface
 * @extends {ClipLayer}
 * @implements {ISelection}
 * @implements {IEditorSave}
 * @classdesc Selection layer to select something
 */
class SelectionLayer extends ClipLayer /* , ISelection, IEditorSave */ {
    /**
     * Set information for selection
     * @abstract
     * @param {JSON} info Selection information
     */
    setSelectionInfo(info) {}

    /**
     * Get selected ID
     * @abstract
     * @return {number} Selected ID (return -1 if not selected)
     */
    getSelected() {}

    /**
     * Set selected by ID
     * @abstract
     * @param {number} id Selected ID
     */
    setSelected(id) {}

    /**
     * Get json data for saving
     * @abstract
     * @return {JSON} Json data for saving
     */
    getSaveData() {}
}

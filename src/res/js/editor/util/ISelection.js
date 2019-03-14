/**
 * Selection interface
 * - ### Selects something and set selected
 * @interface
 * @classdesc Selection to select something and set selected
 */
class ISelection extends Interface {
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
}

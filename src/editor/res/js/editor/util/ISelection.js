/**
 * Selection interface
 * - ### Selects something and set selected
 * @classdesc Selection to select something and set selected
 */
class ISelection extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Get selected ID
     * @interface
     * @return {number} Selected ID (return -1 if not selected)
     */
    getSelected() {}

    /**
     * Set selected by ID
     * @interface
     * @param {number} id Selected ID
     */
    setSelected(id) {}
}

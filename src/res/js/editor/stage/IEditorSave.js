/**
 * Editor save interface
 * - ### It can save data
 * @interface
 * @classdesc Editor save interface that can save data
 */
class IEditorSave extends Interface {
    /**
     * Get json data for saving
     * @abstract
     * @return {JSON} Json data for saving
     */
    getSaveData() {}
}

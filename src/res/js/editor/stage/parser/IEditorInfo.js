/**
 * Editor information interface
 * - ### Gets entity information
 * @interface
 * @classdesc Editor information interface to get information
 */
class IEditorInfo extends Interface {
    /**
     * Get tile information
     * @abstract
     * @return {Object<number, JSON>} Tile information
     */
    getTileInfo() {}

    /**
     * Get entity information
     * @abstract
     * @return {Object<number, JSON>} Entity information
     */
    getEntityInfo() {}
}

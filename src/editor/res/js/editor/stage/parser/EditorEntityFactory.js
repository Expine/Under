/**
 * Editor entity factory
 * - Generates entity by ID
 * - Generates from JSON data
 * - Gets entity information
 * - ### Passes information
 * @extends {JSONEntityFactory}
 * @classdesc Editor entity factory to pass information
 */
class EditorEntityFactory extends JSONEntityFactory /* , IEditorInfo */ { // eslint-disable-line  no-unused-vars
    /**
     * Get tile information
     * @override
     * @protected
     * @return {Object<number, JSON>} Tile information
     */
    getTileInfo() {
        return this.tileInfo;
    }

    /**
     * Get entity information
     * @override
     * @protected
     * @return {Object<number, JSON>} Entity information
     */
    getEntityInfo() {
        return this.entityInfo;
    }
}

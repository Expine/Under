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
     * @return {Object<number, JSON>} Tile information
     */
    getTileInfo() {
        return this.tileInfo;
    }

    /**
     * Get entity information
     * @override
     * @return {Object<number, JSON>} Entity information
     */
    getEntityInfo() {
        return this.entityInfo;
    }

    /**
     * Build sirial chip data
     * @override
     * @protected
     * @param {JSON} data Target base json data
     * @param {JSON} chip Serial chip information
     */
    buildChipSerial(data, chip) {
        data.auto = chip.auto;
        data.autoID = chip.id;
    }
}

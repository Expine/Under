/**
 * Editor tile
 * - It can save data
 * - Stores ID
 * - ### Tile in editor
 * @implements {IEditorEntity}
 * @implements {IEditorSave}
 * @classdesc Editor tile in editor
 */
class EditorTile /* , IEditorEntity, IEditorSave */ { // eslint-disable-line  no-unused-vars
    /**
     * Editor tile constructor
     * @constructor
     * @param {Entity} entity Entity for saving
     * @param {number} id Entity ID
     */
    constructor(entity, id) {
        /**
         * Entity for saving
         * @protected
         * @type {number}
         */
        this.entity = entity;
        /**
         * Entity ID
         * @protected
         * @type {number}
         */
        this.id = id;
    }

    /**
     * Get entity getID
     * @override
     * @return {number} Entity ID
     */
    getID() {
        return this.id;
    }

    /**
     * Judge whether entity is same entity
     * @override
     * @param {Entity} entity Judging entity
     * @return {boolean} Whether entity is same entity
     */
    equals(entity) {
        return this.entity === entity;
    }

    /**
     * Judege whether entity is deployer
     * @override
     * @return {boolen} Whether entity is deployer
     */
    isDeployer() {
        return false;
    }

    /**
     * Get json data for saving
     * @override
     * @return {JSON} Json data for saving
     */
    getSaveData() {
        let ret = {};
        this.buildBaseData(ret);
        return ret;
    }

    /**
     * Build base save data
     * @protected
     * @param {JSON} base Target data
     */
    buildBaseData(base) {
        base.id = this.id;
        base.x = this.entity.x;
        base.y = this.entity.y;
        if (!(this.entity instanceof TileObject)) {
            base.z = this.entity.z;
        }
    }
}

/**
 * Editor tile
 * - Object present on the stage that has coordinate and size
 * - It can save data
 * - Stores ID
 * - ### Tile in editor
 * @extends {Entity}
 * @implements {IEditorEntity}
 * @implements {IEditorSave}
 * @classdesc Editor tile in editor
 */
class EditorTile extends Entity /* , IEditorEntity, IEditorSave */ { // eslint-disable-line  no-unused-vars
    /**
     * Editor tile constructor
     * @constructor
     * @param {Entity} entity Entity for saving
     * @param {number} id Entity ID
     * @param {number} [autoTileBaseID=-1] Auto tile base ID
     */
    constructor(entity, id, autoTileBaseID = -1) {
        super();

        /**
         * Entity for saving
         * @protected
         * @type {Entity}
         */
        this.entity = entity;
        /**
         * Entity ID
         * @protected
         * @type {number}
         */
        this.id = id;
        /**
         * Auto tile base ID
         * @protected
         * @type {number}
         */
        this.autoTileBaseID = autoTileBaseID;
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

    /**
     * Get entity getID
     * @override
     * @return {number} Entity ID
     */
    getID() {
        return this.id;
    }

    /**
     * Get entity
     * @override
     * @return {number} Entity
     */
    getEntity() {
        return this.entity;
    }

    /**
     * Whether it is auto tile or not
     * @abstract
     * @return {boolean} Whether it is auto tile or not
     */
    isAutoTile() {
        return this.getAutoTileBaseID() >= 0;
    }

    /**
     * Get auto tile base ID
     * @abstract
     * @returns {number} Auto tile base ID
     */
    getAutoTileBaseID() {
        return this.autoTileBaseID;
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
     * Set stage
     * @override
     * @param {Stage} stage  Stage instance
     */
    setStage(stage) {
        super.setStage(stage);
        this.entity.setStage(stage);
        this.stage = stage;
    }

    /**
     * Set entity position
     * @override
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} z Z position
     */
    setPosition(x, y, z) {
        super.setPosition(x, y, z);
        this.entity.setPosition(x, y, z);
    }

    /**
     * Set entity size
     * @override
     * @param {number} width Entity width
     * @param {number} height Entity height
     */
    setSize(width, height) {
        super.setSize(width, height);
        this.entity.setSize(width, height);
    }

    /**
     * Initialize entity
     * @override
     */
    init() {
        this.entity.init();
    }

    /**
     * Update entty
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        this.entity.update(dt);
    }

    /**
     * Render entity
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        this.entity.render(ctx, shiftX, shiftY);
    }
}

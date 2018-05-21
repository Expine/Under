/**
 * Editor entity interface
 * - It can save data
 * - ### Stores ID
 * @interface
 * @classdesc Editor entity interface to store ID
 */
class IEditorEntity extends IEditorSave { // eslint-disable-line  no-unused-vars
    /**
     * Get entity getID
     * @abstract
     * @return {number} Entity ID
     */
    getID() {}

    /**
     * Get entity
     * @abstract
     * @return {Entity} Entity
     */
    getEntity() {}

    /**
     * Whether it is auto tile or not
     * @abstract
     * @return {boolean} Whether it is auto tile or not
     */
    isAutoTile() {}

    /**
     * Get auto tile base ID
     * @abstract
     * @returns {number} Auto tile base ID
     */
    getAutoTileBaseID() {}

    /**
     * Judge whether entity is same entity
     * @abstract
     * @param {Entity} entity Judging entity
     * @return {boolean} Whether entity is same entity
     */
    equals(entity) {}

    /**
     * Judege whether entity is deployer
     * @abstract
     * @return {boolen} Whether entity is deployer
     */
    isDeployer() {}
}

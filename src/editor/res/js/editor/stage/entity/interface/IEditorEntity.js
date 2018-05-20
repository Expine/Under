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

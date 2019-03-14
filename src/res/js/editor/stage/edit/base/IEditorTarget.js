/**
 * Editor target interface
 * - ### Target for editing
 * @interface
 * @classdesc Editor target interface that target for editing
 */
class IEditorTarget extends Interface {
    /**
     * Replace and paint
     * @abstract
     * @param {number} x Target x position
     * @param {number} y Target y position
     * @param {number} id Painting ID
     */
    paint(x, y, id) {}

    /**
     * Get editor entity
     * @abstract
     * @param {number} x Target x position
     * @param {number} y Target y position
     * @return {IEditorEntity} Editor entity
     */
    getEditorEntity(x, y) {}
}

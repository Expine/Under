/**
 * Editor target interface
 * - ### Target for editing
 * @interface
 * @classdesc Editor target interface that target for editing
 */
class IEditorTarget extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Replace and paint
     * @abstract
     * @param {number} x Target x position
     * @param {number} y Target y position
     * @param {number} id Painting ID
     */
    paint(x, y, id) {}

    /**
     * Get painting ID by position
     * @abstract
     * @param {number} x Target x position
     * @param {number} y Target y position
     * @return {number} Painting ID
     */
    getID(x, y) {}
}

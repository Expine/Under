/**
 * Editable interface
 * - ### It can be edited by tile and entity information
 * @interface
 * @classdesc Editable interface that can be edited by tile and entity information
 */
class IEditable extends Interface {
    /**
     * Set editor base
     * @abstract
     * @param {EditorBase} editor Editor base
     */
    setEditor(editor) {}

    /**
     * Set tile selection
     * @abstract
     * @param {ISelection} selection Tile selection
     */
    setTileSelection(selection) {}

    /**
     * Set entity selection
     * @abstract
     * @param {ISelection} selection Entity selection
     */
    setEntitySelection(selection) {}
}

/**
 * Editable interface
 * - ### It can be edited by tile and entity information
 * @interface
 * @classdesc Editable interface that can be edited by tile and entity information
 */
class IEditable extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Set tile selection
     * @param {ISelection} selection Tile selection
     */
    setTileSelection(selection) {}

    /**
     * Set entity selection
     * @param {ISelection} selection Entity selection
     */
    setEntitySelection(selection) {}
}

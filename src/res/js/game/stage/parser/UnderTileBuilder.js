/**
 * Generate under tile from json data
 * Has json data parsing
 * @extends {TileBuilder}
 * @classdesc Builder to generate under tile
 */
class UnderTileBuilder extends TileBuilder { // eslint-disable-line  no-unused-vars
    /**
     * Make underlying tile object
     * @override
     * @protected
     * @param {number} x Entity x position
     * @param {number} y Entity y position
     * @param {json} tile Tile information json data
     * @return {Entity} Underlying tile object
     */
    makeTileBase(x, y, tile) {
        return new UnderTileObject(tile.terrain, tile.x, tile.y, tile.width, tile.height, x, y, tile.width, tile.height, tile.file);
    }
}

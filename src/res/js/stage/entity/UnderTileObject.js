/**
 * Under stage tile object
 * Indicates the tile of not moving on stage
 * Decides the tile to be displayed by the ID, using the sprite indicating the stage tiles
 * @implements {TileObject}
 * @classdesc Stage tile object
 */
class UnderTileObject extends TileObject { // eslint-disable-line  no-unused-vars
    /**
     * Get tile id
     * @return {number} tile id
     */
    getGlobalID() {
        return this.verticalId * 1000 + this.horizontalId;
    }
}

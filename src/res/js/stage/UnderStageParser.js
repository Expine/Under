/**
 * Under stage parser to generate stage
 * @implements {CSVStageParser}
 * @classdesc Under parser to generate stage
 */
class UnderStageParser extends CSVStageParser { // eslint-disable-line  no-unused-vars
    /**
     * Make tile object
     * @param {number} verticalId tile vertical id
     * @param {number} horizontalId tile horizontal id
     * @param {number} tileWidth tile width
     * @param {number} tileHeight tile height
     * @param {number} x x position
     * @param {number} y y position
     * @param {number} width object width
     * @param {number} height object height
     * @param {number} imageID tile image id
     */
    makeTileObject(verticalId, horizontalId, tileWidth, tileHeight, x, y, width, height, imageID) {
        let tile = new UnderTileObject(verticalId, horizontalId, tileWidth, tileHeight, x, y, width, height, imageID);
        tile.setCollider(new RectangleCollider(tile, 0, 0, width, height));
        tile.setMaterial(new DefaultMaterial());
        return tile;
    }
}

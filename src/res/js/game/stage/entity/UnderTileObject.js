/**
 * Under stage tile object
 * Indicates the tile of not moving on stage
 * Decides the tile to be displayed by the ID, using the sprite indicating the stage tiles
 * @extends {TileObject}
 * @classdesc Stage tile object
 */
class UnderTileObject extends TileObject { // eslint-disable-line  no-unused-vars
    /**
     * Tile object constructor
     * @constructor
     * @param {number} terrainID Terrain ID
     * @param {number} srcX X coordinate on the file
     * @param {number} srcY Y coordinate on the file
     * @param {number} srcW Width on file
     * @param {number} srcH Height on file
     * @param {number} x x position
     * @param {number} y y position
     * @param {number} width tile width
     * @param {number} height tile height
     * @param {number} imageID tile image id
     */
    constructor(terrainID, srcX, srcY, srcW, srcH, x, y, width, height, imageID) {
        super(srcX, srcY, srcW, srcH, x, y, width, height, imageID);

        /**
         * Terrain ID
         * @protected
         * @type {number}
         */
        this.terrainID = terrainID;
    }
}

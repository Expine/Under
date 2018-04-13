/**
 * Under tile object
 * - Object present on the stage that has coordinate and size
 * - Has image ID
 * - It can be collided because it has material and collider
 * - It is fixed and no change will occur
 * - Decides the tile to be displayed by the ID and position, using the sprite indicating the stage tiles
 * - It can be gotten terrain ID
 * - ### Has terrain information
 * @extends {TileObject}
 * @implements {ITerrain}
 * @classdesc Under tile object to have terrain information
 */
class UnderTileObject extends TileObject /* , ITerrain */ { // eslint-disable-line  no-unused-vars
    /**
     * Under tile object constructor
     * @constructor
     * @param {number} terrainID Terrain ID
     * @param {number} srcX X coordinate on the file
     * @param {number} srcY Y coordinate on the file
     * @param {number} srcW Width on file
     * @param {number} srcH Height on file
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} width Tile width
     * @param {number} height Tile height
     * @param {number} imageID Tile image id
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

    /**
     * Get terrain ID
     * @override
     * @return {number} Terrain ID
     */
    getTerrainID() {
        return this.terrainID;
    }
}

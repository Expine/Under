/**
 * Under tile object
 * - Object present on the stage that has coordinate and size
 * - Manages image
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
     */
    constructor(terrainID) {
        super();

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

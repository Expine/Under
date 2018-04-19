/**
 * Under tile builder
 * - Generates entity from json data
 * - Generate tile from json data
 * - ### Generates unique tile object
 * @extends {TileBuilder}
 * @classdesc Under tile builder to generates unique tile object
 */
class UnderTileBuilder extends TileBuilder { // eslint-disable-line  no-unused-vars
    /**
     * Make collider
     * @protected
     * @param {json} collider Collider information json data
     * @return {Collider} Collider
     */
    makeCollider(collider) {
        if (collider.excluded) {
            if (collider.directional) {
                if (collider.type == `Rectangle`) {
                    return new DirectionalExcludedRectangleCollider(collider.startX, collider.startY, collider.width, collider.height, collider.id);
                } else if (collider.type == `RoundRectangle`) {
                    return new DirectionalExcludedRoundRectangleCollider(collider.startX, collider.startY, collider.width, collider.height, collider.cut, collider.id);
                }
            } else {
                if (collider.type == `Rectangle`) {
                    return new ExcludedRectangleCollider(collider.startX, collider.startY, collider.width, collider.height, collider.id);
                } else if (collider.type == `RoundRectangle`) {
                    return new ExcludedRoundRectangleCollider(collider.startX, collider.startY, collider.width, collider.height, collider.cut, collider.id);
                }
            }
        } else {
            if (collider.directional) {
                if (collider.type == `Rectangle`) {
                    return new DirectionalRectangleCollider(collider.startX, collider.startY, collider.width, collider.height, collider.id);
                } else if (collider.type == `RoundRectangle`) {
                    return new DirectionalRoundRectangleCollider(collider.startX, collider.startY, collider.width, collider.height, collider.cut, collider.id);
                }
            } else {
                return super.makeCollider(collider);
            }
        }
    }

    /**
     * Make underlying tile object
     * @override
     * @protected
     * @param {number} x Entity x position
     * @param {number} y Entity Y position
     * @param {json} tile Tile information json data
     * @return {InfluentialEntity} Underlying tile object
     */
    makeTileBase(x, y, tile) {
        return new UnderTileObject(tile.terrain, tile.x, tile.y, tile.width, tile.height, x, y, tile.width, tile.height, tile.file);
    }
}

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
     * Make base collider
     * @protected
     * @param {JSON} collider Collider information json data
     * @return {Collider} Collider
     */
    makeBaseCollider(collider) {
        if (collider !== undefined && collider.excluded) {
            if (collider.type == `Rectangle`) {
                return new ExcludedRectangleCollider(collider.startX, collider.startY, collider.width, collider.height, collider.id);
            } else if (collider.type == `RoundRectangle`) {
                return new ExcludedRoundRectangleCollider(collider.startX, collider.startY, collider.width, collider.height, collider.cut, collider.id);
            }
        } else {
            return super.makeBaseCollider(collider);
        }
    }

    /**
     * Make underlying tile object
     * @override
     * @protected
     * @param {JSON} deploy Entity deploy json data
     * @param {JSON} tile Tile information json data
     * @return {InfluentialEntity} Underlying tile object
     */
    makeTileBase(deploy, tile) {
        return new UnderTileObject(tile.terrain, tile.x, tile.y, tile.width, tile.height, deploy.x, deploy.y, tile.width, tile.height, this.loadTileImage(tile.file));
    }
}

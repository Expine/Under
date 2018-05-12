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
    makeCollider(collider) {
        if (collider !== undefined && collider.excluded) {
            switch (collider.type) {
                case `Rectangle`:
                    return new ExcludedRectangleCollider(collider.startX, collider.startY, collider.width, collider.height, collider.id);
                case `RoundRectangle`:
                    return new ExcludedRoundRectangleCollider(collider.startX, collider.startY, collider.width, collider.height, collider.cut, collider.id);
            }
        }
        return super.makeCollider(collider);
    }

    /**
     * Make underlying tile object
     * @override
     * @protected
     * @param {JSON} deploy Entity deploy json data
     * @param {JSON} json Tile information json data
     * @return {Entity} Underlying tile object
     */
    makeTileBase(deploy, json) {
        let ret = new UnderTileObject();
        ret.setTerrainID(json.terrain);
        return ret;
    }
}

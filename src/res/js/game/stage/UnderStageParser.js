/**
 * Under stage parser to generate stage
 * @extends {JSONStageParser}
 * @classdesc Under parser to generate stage
 */
class UnderStageParser extends JSONStageParser { // eslint-disable-line  no-unused-vars
    /**
     * Make underlying tile object
     * @protected
     * @param {json} tile Tile information json data
     * @param {json} chip Chip actually placed json data
     * @return {TileObject} Underlying tile object
     */
    makeTileBase(tile, chip) {
        return new UnderTileObject(tile.terrain, tile.x, tile.y, tile.width, tile.height, chip.x, chip.y, chip.width, chip.height, tile.file);
    }

    /**
     * Make underlying entity
     * @protected
     * @param {json} info Entity information json data
     * @param {json} entity Entity actually placed json data
     * @return {Entity} Underlying entity
     */
    makeEntityBase(info, entity) {
        if (info.type == `Player`) {
            return new UnderPlayer(entity.x, entity.y, info.width, info.height, info.fileID);
        }
        return super.makeEntityBase(info, entity);
    }
}

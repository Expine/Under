/**
 * Editor stage parser to generate stage
 * - Generates a stage from a file
 * - Parses JSON file
 * - Set original response
 * - Set unique builder by default
 * - ### Generates editor element
 * @extends {UnderStageParser}
 * @classdesc Editor stage parser to generate editor element
 */
class EditorStageParser extends UnderStageParser { // eslint-disable-line  no-unused-vars
    /**
     * Make base stage for parsing stage
     * @override
     * @protected
     * @param {JSON} stage Stage json data
     * @return {Stage} Stage instance for base of parsing
     */
    makeBaseStage(stage) {
        return new EditorStage(new SplitManagementStage(stage.width, stage.height), stage.tileInfo, stage.entityInfo);
    }

    /**
     * Make base map for parsing stage
     * @override
     * @protected
     * @param {JSON} map Map json data
     * @return {Map} Map instance for base of parsing
     */
    /*
    makeMap(map) {
        let ret = null;
        if (map.type == `Sequential`) {
            ret = new EditorMap();
            for (let back of map.backs) {
                ret.addMap(this.makeMap(back));
            }
        } else if (map.type == `Invariant`) {
            ret = new EditorInvariantBackMap(this.loadMapImage(map.file));
        }
        return ret;
    }
    */

    /**
     * Make base camera for parsing stage
     * @override
     * @protected
     * @param {JSON} camera Camera json data
     * @param {number} width Camera width
     * @param {number} height Camera height
     * @return {Camera} Camera instance for base of parsing
     */
    makeBaseCamera(camera, width, height) {
        return new EditorCamera(width, height);
    }

    /**
     * Make base phisical world for parsing stage
     * @protected
     * @param {JSON} world World json data
     * @return {PhysicalWorld} Physical world instance for base of parsing
     */
    makeBaseWorld(world) {
        return new EditorWorld(new SplitWorld(world.width, world.height), world.width, world.height);
    }

    /**
     * Add tile by chip data
     * @param {EditorStage} base Base stage
     * @param {number} layer Layer index
     * @param {JSON} chip Chip json data
     * @param {JSON} tileInfo Tile information json data
     */
    addTile(base, layer, chip, tileInfo) {
        super.addTile(base, layer, chip, tileInfo);
        base.addEntityID(chip.id);
    }

    /**
     * Add entity by layer data
     * @override
     * @param {Stage} base Base stage
     * @param {number} layer Layer index
     * @param {JSON} entity Entity json data
     * @param {JSON} entityInfo Entity information json data
     */
    addEntity(base, layer, entity, entityInfo) {
        super.addEntity(base, layer, entity, entityInfo);
        base.addEntityID(entity.id);
    }
}

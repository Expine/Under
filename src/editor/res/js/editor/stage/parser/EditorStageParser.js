/**
 * Editor stage parser to generate stage
 * @extends {UnderStageParser}
 * @classdesc Editor stage parser to generate stage
 */
class EditorStageParser extends UnderStageParser { // eslint-disable-line  no-unused-vars
    /**
     * Make base stage for parsing stage
     * @override
     * @protected
     * @param {json} stage Stage json data
     * @return {Stage} stage instance for base of parsing
     */
    makeBaseStage(stage) {
        return new EditorStage(stage.tileInfo, stage.entityInfo);
    }

    /**
     * Make base map for parsing stage
     * @override
     * @protected
     * @param {json} map Map json data
     * @return {Map} map instance for base of parsing
     */
    makeBaseMap(map) {
        let ret = new EditorMap(map.width, map.height);
        for (let back of map.backs) {
            ret.addMap(this.makeMapElement(map, back));
        }
        return ret;
    }

    /**
     * Make map for parsing stage
     * @protected
     * @param {json} map Map json data
     * @param {json} back Map element json data
     * @return {Map} Map element of parsing
     */
    makeMapElement(map, back) {
        if (back.type == `Invariant`) {
            let id = ContextImage.it.loadImage(`back/${back.file}`);
            return new EditorInvariantBackMap(id, map.width, map.height);
        } else {
            return super.makeMapElement(map, back);
        }
    }

    /**
     * Make base camera for parsing stage
     * @override
     * @protected
     * @param {json} camera Camera json data
     * @param {number} width Camera width
     * @param {number} height Camera height
     * @return {Camera} camera instance for base of parsing
     */
    makeBaseCamera(camera, width, height) {
        return new EditorCamera(width, height);
    }

    /**
     * Add tile by chip data
     * @param {EditorStage} base Base stage
     * @param {json} chip Chip json data
     * @param {json} tileInfo Tile information json data
     */
    addTile(base, chip, tileInfo) {
        base.addEntity(this.tileBuilder.build(chip.x, chip.y, tileInfo[chip.id]));
        base.addEntityID(chip.id);
    }

    /**
     * Add entity by layer data
     * @override
     * @param {Stage} base Base stage
     * @param {json} entity Entity json data
     * @param {json} entityInfo Entity information json data
     */
    addEntity(base, entity, entityInfo) {
        base.addEntity(this.characterBuilder.build(entity.x, entity.y, entityInfo[entity.id]));
        base.addEntityID(entity.id);
    }
}

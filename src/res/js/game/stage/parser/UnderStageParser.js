/**
 * Under stage parser to generate stage
 * @extends {JSONStageParser}
 * @classdesc Under parser to generate stage
 */
class UnderStageParser extends JSONStageParser { // eslint-disable-line  no-unused-vars
    /**
     * Under Stage parser constructor
     * @param {EntityBuilder} tile Tile builder instance
     * @param {EntityBuilder} chara Character builder instance
     */
    constructor(tile = new UnderTileBuilder(), chara = new UnderCharacterBuilder()) {
        super(tile, chara);
    }

    /**
     * Make base phisical world for parsing stage
     * @override
     * @protected
     * @return {PhysicalWorld} Physical world instance for base of parsing
     */
    makeBaseWorld() {
        let world = new SequentialWorld();
        world.setResponse(new UnderRepulsionResponse());
        return world;
    }
}

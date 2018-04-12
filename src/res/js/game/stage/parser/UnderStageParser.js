/**
 * Under stage parser to generate stage
 * - Generates a stage from a file
 * - Parses JSON file
 * - ### Set original response
 * - ### Set unique builder by default
 * @extends {JSONStageParser}
 * @classdesc Under stage parser to set original response and unique builder by default
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
     * Make physical response
     * @protected
     * @return {CollisionResponse} Physical response
     */
    makePhysicalResponse() {
        return new UnderRepulsionResponse();
    }
}

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
     * @param {EntityBuilder} [tile = UnderTileBuilder] Tile builder instance
     * @param {EntityBuilder} [chara = UnderCharacterBuilder] Character builder instance
     * @param {EventBuilder} [event = UnderEventBuilder] Event builder instance
     */
    constructor(tile = new UnderTileBuilder(), chara = new UnderCharacterBuilder(), event = new UnderEventBuilder()) {
        super(tile, chara, event);
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

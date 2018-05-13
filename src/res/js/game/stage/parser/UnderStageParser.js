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
     * Make entity factory
     * @override
     * @protected
     * @param {JSON} stage Stage json data
     * @return {EntityFactory} Entity factory
     */
    makeEntityFactory(stage) {
        let ret = new JSONEntityFactory(new UnderTileBuilder(), new UnderCharacterBuilder(), new UnderEventBuilder());
        for (let it of stage.tiles) {
            ret.addTileInfo(JSON.parse(Util.loadFile(`src/res/stage/${it}`)));
        }
        for (let it of stage.entities) {
            ret.addEntityInfo(JSON.parse(Util.loadFile(`src/res/stage/${it}`)));
        }
        return ret;
    }

    /**
     * Make physical response
     * @override
     * @protected
     * @return {CollisionResponse} Physical response
     */
    makePhysicalResponse() {
        return new UnderRepulsionResponse();
    }
}

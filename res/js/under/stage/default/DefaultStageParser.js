/**
 * Default stage parser sample
 * @implements {StageParser}
 * @classdesc Stage parser sample
 */
class DefaultStageParser extends StageParser {
    /**
     * Make base stage for parsing stage
     */
    makeBaseStage() {
        return new DefaultStage();
    }

    /**
     * Make base map for parsing stage
     */
    makeBaseMap() {
        return new DefaultMap();
    }

    /**
     * Parset file to stage
     * @override
     * @param {string} filePath stage file path
     */
    parse(filePath) {
        let stage = this.makeBaseStage();
        stage.setMap(this.makeBaseMap());
    }

}
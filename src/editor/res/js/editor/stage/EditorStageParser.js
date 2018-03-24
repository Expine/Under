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
     * @return {Stage} stage instance for base of parsing
     */
    makeBaseStage() {
        return new EditorStage();
    }

    /**
     * Make base camera for parsing stage
     * @protected
     * @param {json} camera Camera json data
     * @param {number} width Camera width
     * @param {number} height Camera height
     * @return {Camera} camera instance for base of parsing
     */
    makeBaseCamera(camera, width, height) {
        return new EditorCamera(width, height);
    }
}

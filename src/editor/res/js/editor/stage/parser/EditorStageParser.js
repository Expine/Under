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
     * Editor stage parser
     */
    constructor() {
        super();

        // TODO: Should abstract
        /**
         * Editor stage
         * @protected
         * @type {EditorStage}
         */
        this.editorStage = null;
    }

    /**
     * Make base stage for parsing stage
     * @override
     * @protected
     * @param {JSON} stage Stage json data
     * @return {Stage} Stage instance for base of parsing
     */
    makeBaseStage(stage) {
        return this.editorStage = new EditorStage(super.makeBaseStage(stage), stage.tileInfo, stage.entityInfo);
    }

    /**
     * Make base camera for parsing stage
     * @override
     * @protected
     * @param {JSON} camera Camera json data
     * @param {number} width Camera width
     * @param {number} height Camera height
     * @return {Camera} Camera instance for base of parsing
     */
    makeBaseCamera(camera) {
        return new EditorCamera(super.makeBaseCamera(camera));
    }

    /**
     * Make base phisical world for parsing stage
     * @protected
     * @param {JSON} stage Stage json data
     * @param {JSON} world World json data
     * @return {PhysicalWorld} Physical world instance for base of parsing
     */
    makeBaseWorld(stage, world) {
        return new EditorWorld(super.makeBaseWorld(stage, world), stage.width, stage.height);
    }
}

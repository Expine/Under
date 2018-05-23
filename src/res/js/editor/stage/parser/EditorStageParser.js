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
     * @param {ImageBuilder} [image = EditorImageBuilder] Image builder instance
     * @param {EditBuilder} [edit = SimpleEditBuilder] Edit builder instance
     */
    constructor(image = new EditorImageBuilder(), edit = new SimpleEditBuilder()) {
        super(image);
        /**
         * Edit builder instance
         * @protected
         * @type {EditBuilder}
         */
        this.editBuilder = edit;
    }

    /**
     * Make base stage for parsing stage
     * @override
     * @protected
     * @param {JSON} stage Stage json data
     * @return {Stage} Stage instance for base of parsing
     */
    makeBaseStage(stage) {
        return new EditorStage(super.makeBaseStage(stage), stage.tiles, stage.entities);
    }

    /**
     * Make background for parsing stage
     * @override
     * @protected
     * @param {JSON} back Background json data
     * @return {Background} Background instance for base of parsing
     */
    makeBackground(back) {
        return new EditorBackground(super.makeBackground(back));
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

    /**
     * Make entity factory
     * @override
     * @protected
     * @param {JSON} stage Stage json data
     * @return {EntityFactory} Entity factory
     */
    makeEntityFactory(stage) {
        const ret = new EditorEntityFactory(new EditorTileBuilder(), new EditorCharacterBuilder(), new EditorEventBuilder(), this.imageBuilder);
        for (const it of stage.tiles) {
            ret.addTileInfo(JSON.parse(Util.loadFile(`src/res/stage/${it}`)));
        }
        for (const it of stage.entities) {
            ret.addEntityInfo(JSON.parse(Util.loadFile(`src/res/stage/${it}`)));
        }
        return ret;
    }

    /**
     * Parse file to stage
     * @abstract
     * @param {string} filePath Stage file path
     * @param {number} width Stage width for rendering area
     * @param {number} height Stage height for rendering area
     * @return {Stage} Generated stage
     */
    parse(filePath, width, height) {
        const stage = super.parse(filePath, width, height);
        if (BaseUtil.implementsOf(stage, IEditable)) {
            stage.setEditor(this.editBuilder.build());
        }
        return stage;
    }
}

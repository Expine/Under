/**
 * JSON parser to generate stage
 * It can also be used as a builder pattern
 * @implements {StageParser}
 * @classdesc JSON parser to generate stage
 */
class JSONStageParser extends StageParser { // eslint-disable-line  no-unused-vars
    /**
     * JSON Stage parser constructor
     * @param {EntityBuilder} tile Tile builder instance
     * @param {EntityBuilder} chara Character builder instance
     */
    constructor(tile = new TileBuilder(), chara = new CharacterBuilder()) {
        super();
        /**
         * Tile builder instance
         * @protected
         * @type {EntityBuilder}
         */
        this.tileBuilder = tile;
        /**
         * Character builder instance
         * @protected
         * @type {EntityBuilder}
         */
        this.characterBuilder = chara;
    }

    /**
     * Make base stage for parsing stage
     * @protected
     * @param {json} stage Stage json data
     * @return {Stage} stage instance for base of parsing
     */
    makeBaseStage(stage) {
        return new SplitManagementStage();
    }

    /**
     * Make base map for parsing stage
     * @protected
     * @param {json} map Map json data
     * @return {Map} map instance for base of parsing
     */
    makeBaseMap(map) {
        let ret = new SequentialMap(map.width, map.height);
        for (let back of map.backs) {
            if (back.type == `Invariant`) {
                let id = ContextImage.it.loadImage(`res/image/back/${back.file}`);
                ret.addMap(new InvariantBackMap(id, map.width, map.height));
            } else {
                console.log(`Not Map: ${map}`);
            }
        }
        return ret;
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
        return new CenterCamera(width, height);
    }

    /**
     * Make base phisical world for parsing stage
     * @protected
     * @return {PhysicalWorld} Physical world instance for base of parsing
     */
    makeBaseWorld() {
        let world = new SequentialWorld();
        world.setResponse(new RepulsionResponse());
        return world;
    }


    /**
     * Parset file to stage
     * @override
     * @param {string} filePath stage file path
     * @param {number} width stage width for rendering area
     * @param {number} height stage height for rendering area
     * @return {Stage} stage instance
     */
    parse(filePath, width, height) {
        // get stage file data
        let stage = JSON.parse(Util.loadFile(filePath));
        let tiles = JSON.parse(Util.loadFile(`res/stage/${stage.tiles}`));
        let entities = JSON.parse(Util.loadFile(`res/stage/${stage.entities}`));
        // make tile information
        stage.tileInfo = {};
        for (let tile of tiles.tiles) {
            let fileID = ContextImage.it.loadImage(`res/image/tile/${tile.file}`);
            for (let chip of tile.chips) {
                stage.tileInfo[chip.id] = chip;
                stage.tileInfo[chip.id].file = fileID;
            }
        }
        // make entity information
        stage.entityInfo = {};
        for (let entity of entities.entities) {
            stage.entityInfo[entity.id] = entity;
            stage.entityInfo[entity.id].file = ContextImage.it.loadImage(`res/image/chara/${entity.file}`);
        }

        // make stage
        let base = this.makeBaseStage(stage);
        base.setMap(this.makeBaseMap(stage.map));
        base.setCamera(this.makeBaseCamera(stage.camera, width, height));
        base.setPhysicalWorld(this.makeBaseWorld());
        // make tile
        for (let layer of stage.layers) {
            for (let chip of layer) {
                base.addEntity(this.tileBuilder.build(chip.x, chip.y, stage.tileInfo[chip.id]));
            }
        }
        // make entity
        for (let entity of stage.deploy) {
            base.addEntity(this.characterBuilder.build(entity.x, entity.y, stage.entityInfo[entity.id]));
        }
        return base;
    }
}

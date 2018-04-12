/**
 * JSON stage parser
 * - Generates a stage from a file
 * - ### Parses JSON file
 * @implements {StageParser}
 * @classdesc JSON stage parser to parse JSON file
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
     * @return {Stage} Stage instance for base of parsing
     */
    makeBaseStage(stage) {
        return Engine.debug ? new DebugStage(stage.width, stage.height) : new SplitManagementStage(stage.width, stage.height);
    }

    /**
     * Make base map for parsing stage
     * @protected
     * @param {json} map Map json data
     * @return {Map} Map instance for base of parsing
     */
    makeBaseMap(map) {
        let ret = new SequentialMap();
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
            let id = ResourceManager.image.load(`back/${back.file}`);
            return new InvariantBackMap(id);
        } else {
            console.log(`Not Map: ${back}`);
        }
    }

    /**
     * Make base camera for parsing stage
     * @protected
     * @param {json} camera Camera json data
     * @param {number} width Camera width
     * @param {number} height Camera height
     * @return {Camera} Camera instance for base of parsing
     */
    makeBaseCamera(camera, width, height) {
        return new MovingCenterCamera(width, height);
    }

    /**
     * Make base phisical world for parsing stage
     * @protected
     * @return {PhysicalWorld} Physical world instance for base of parsing
     */
    makeBaseWorld() {
        return Engine.debug ? new DebugWorld() : new SequentialWorld();
    }

    /**
     * Make physical response
     * @protected
     * @return {CollisionResponse} Physical response
     */
    makePhysicalResponse() {
        return new RepulsionResponse();
    }

    /**
     * Add tile by chip data
     * @param {Stage} base Base stage
     * @param {json} chip Chip json data
     * @param {json} tileInfo Tile information json data
     */
    addTile(base, chip, tileInfo) {
        base.addEntity(this.tileBuilder.build(chip.x, chip.y, tileInfo[chip.id]));
    }

    /**
     * Add entity by layer data
     * @param {Stage} base Base stage
     * @param {json} entity Entity json data
     * @param {json} entityInfo Entity information json data
     */
    addEntity(base, entity, entityInfo) {
        base.addEntity(this.characterBuilder.build(entity.x, entity.y, entityInfo[entity.id]));
    }


    /**
     * Parset file to stage
     * @override
     * @param {string} filePath Stage file path
     * @param {number} width Stage width for rendering area
     * @param {number} height Stage height for rendering area
     * @return {Stage} Stage instance
     */
    parse(filePath, width, height) {
        // get stage file data
        let stage = JSON.parse(Util.loadFile(filePath));
        let tiles = JSON.parse(Util.loadFile(`src/res/stage/${stage.tiles}`));
        let entities = JSON.parse(Util.loadFile(`src/res/stage/${stage.entities}`));
        // make tile information
        stage.tileInfo = {};
        stage.tileInfo.tiles = stage.tiles;
        for (let tile of tiles.tiles) {
            let fileID = ResourceManager.image.load(`tile/${tile.file}`);
            for (let chip of tile.chips) {
                stage.tileInfo[chip.id] = chip;
                stage.tileInfo[chip.id].file = fileID;
            }
        }
        // make entity information
        stage.entityInfo = {};
        stage.entityInfo.entities = stage.entities;
        for (let entity of entities.entities) {
            stage.entityInfo[entity.id] = entity;
            stage.entityInfo[entity.id].file = ResourceManager.image.load(`chara/${entity.file}`);
        }

        // make stage
        let base = this.makeBaseStage(stage);
        base.setMap(this.makeBaseMap(stage.map));
        base.setCamera(this.makeBaseCamera(stage.camera, width, height));
        base.setPhysicalWorld(this.makeBaseWorld());
        base.getPhysicalWorld().setResponse(this.makePhysicalResponse());
        // make tile
        for (let layer of stage.layers) {
            for (let chip of layer) {
                this.addTile(base, chip, stage.tileInfo);
            }
        }
        // make entity
        for (let entity of stage.deploy) {
            this.addEntity(base, entity, stage.entityInfo);
        }
        return base;
    }
}

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
     * @param {EventBuilder} event Event builder instance
     */
    constructor(tile = new TileBuilder(), chara = new CharacterBuilder(), event = new SimpleEventBuilder()) {
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

        /**
         * Event builder instance
         * @protected
         * @type {EventBuilder}
         */
        this.eventBuilder = event;
    }

    /**
     * Load map image
     * @protected
     * @param {string} path Map image path
     * @return {number} Map image ID
     */
    loadMapImage(path) {
        return ResourceManager.image.load(`back/${path}`);
    }

    /**
     * Make base stage for parsing stage
     * @protected
     * @param {JSON} stage Stage json data
     * @return {Stage} Stage instance for base of parsing
     */
    makeBaseStage(stage) {
        let ret = new SplitManagementStage(stage.width, stage.height);
        if (Engine.debug) {
            ret = new DebugStage(ret);
        }
        return ret;
    }

    /**
     * Make map for parsing stage
     * @protected
     * @param {JSON} map Map json data
     * @return {Map} Map instance for base of parsing
     */
    makeMap(map) {
        let ret = null;
        if (map.type == `Sequential`) {
            ret = new SequentialMap();
            for (let back of map.backs) {
                ret.addMap(this.makeMap(back));
            }
        } else if (map.type == `Invariant`) {
            ret = new InvariantBackMap(this.loadMapImage(map.file));
        } else if (map.type == `Movement`) {
            ret = new MovementMap(this.loadMapImage(map.file), map.width, map.height, map.rx, map.ry);
        } else if (map.type == `Fixed`) {
            ret = new FixedBackMap(this.loadMapImage(map.file), map.x, map.y, map.width, map.height);
        }
        return ret;
    }

    /**
     * Make base camera for parsing stage
     * @protected
     * @param {JSON} camera Camera json data
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
     * @param {JSON} world World json data
     * @return {PhysicalWorld} Physical world instance for base of parsing
     */
    makeBaseWorld(world) {
        return Engine.debug ? new DebugWorld(new SplitWorld(world.width, world.height)) : new SplitWorld(world.width, world.height);
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
     * @param {number} layer Layer index
     * @param {JSON} chip Chip json data
     * @param {JSON} tileInfo Tile information json data
     */
    addTile(base, layer, chip, tileInfo) {
        if (chip.z === undefined) {
            chip.z = layer;
        }
        let tile = this.tileBuilder.build(chip, tileInfo[chip.id]);
        if (BaseUtil.implementsOf(tile, IEventEntity)) {
            tile.setEvent(this.eventBuilder(chip.event));
        }
        base.addEntity(tile);
    }

    /**
     * Add entity by layer data
     * @param {Stage} base Base stage
     * @param {number} layer Layer index
     * @param {JSON} entity Entity json data
     * @param {JSON} entityInfo Entity information json data
     */
    addEntity(base, layer, entity, entityInfo) {
        if (entity.z === undefined) {
            entity.z = layer;
        }
        let chara = this.characterBuilder.build(entity, entityInfo[entity.id]);
        if (BaseUtil.implementsOf(chara, IEventEntity)) {
            chara.setEvent(this.eventBuilder.build(entity.event));
        }
        base.addEntity(chara);
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
            for (let chip of tile.chips) {
                stage.tileInfo[chip.id] = chip;
                stage.tileInfo[chip.id].file = tile.file;
            }
        }
        // make entity information
        stage.entityInfo = {};
        stage.entityInfo.entities = stage.entities;
        for (let entity of entities.entities) {
            stage.entityInfo[entity.id] = entity;
        }

        // make stage
        let base = this.makeBaseStage(stage);
        base.setMap(this.makeMap(stage.map));
        base.setCamera(this.makeBaseCamera(stage.camera, width, height));
        base.setPhysicalWorld(this.makeBaseWorld(stage));
        base.getPhysicalWorld().setResponse(this.makePhysicalResponse());
        let layerIndex = 0;
        // make tile
        for (let layer of stage.layers) {
            for (let chip of layer) {
                this.addTile(base, layerIndex++, chip, stage.tileInfo);
            }
        }
        // make entity
        for (let entity of stage.deploy) {
            this.addEntity(base, layerIndex, entity, stage.entityInfo);
        }
        return base;
    }
}

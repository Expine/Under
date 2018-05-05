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
        switch (map.type) {
            case `Sequential`:
                let ret = new SequentialMap();
                for (let back of map.backs) {
                    ret.addMap(this.makeMap(back));
                }
                return ret;
            case `Invariant`:
                return new InvariantBackMap(this.loadMapImage(map.file));
            case `Movement`:
                return new MovementMap(this.loadMapImage(map.file), map.x, map.y, map.width, map.height, map.rx, map.ry);
            case `Area`:
                return new AreaMap(this.loadMapImage(map.file), map.x, map.y, map.width, map.height, map.areaW, map.areaH);
            case `Fixed`:
                return new FixedBackMap(this.loadMapImage(map.file), map.x, map.y, map.width, map.height);
            default:
                return null;
        }
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
        let ret = null;
        if (camera.type == `center`) {
            ret = new CenterCamera();
        }
        if (camera.cliping) {
            ret = new ClipCamera(ret);
        }
        if (camera.moving) {
            ret = new MovingCamera(ret);
        }
        if (camera.force) {
            ret = new ForceMoveCamera(ret, camera.force.x, camera.force.y, camera.force.speed);
        }
        ret.setScreenSize(width, height);
        return ret;
    }

    /**
     * Make base phisical world for parsing stage
     * @protected
     * @param {JSON} stage Stage json data
     * @param {JSON} world World json data
     * @return {PhysicalWorld} Physical world instance for base of parsing
     */
    makeBaseWorld(stage, world) {
        let ret = null;
        switch (world.type) {
            case `split`:
                ret = new SplitWorld(stage.width, stage.height);
                break;
            case `gravity`:
                ret = new GravityWorld(stage.width, stage.height);
                for (let it of world.gravity) {
                    ret.addGravity(it.x, it.y, it.delta);
                }
                break;
        }
        if (Engine.debug) {
            ret = new DebugWorld(ret);
        }
        return ret;
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
     * Build tile information
     * @param {JSON} tileInfo Tile informmation for building
     * @param {JSON} tiles Tile information from file
     */
    buildTileInfo(tileInfo, tiles) {
        // set default info
        let defaultCollider = {
            type: `Rectangle`,
            startX: 0,
            startY: 0,
            width: 0,
            height: 0,
        };
        let defaultMaterial = {
            mass: 10,
            elasticity: 0.1,
            mu: 0.65,
        };
        for (let tile of tiles.tiles) {
            for (let chip of tile.chips) {
                // set default collider
                if (chip.collider === undefined) {
                    chip.collider = JSON.parse(JSON.stringify(defaultCollider));
                    chip.collider.width = chip.width;
                    chip.collider.height = chip.height;
                }
                // set default material
                if (chip.material === undefined) {
                    chip.material = JSON.parse(JSON.stringify(defaultMaterial));
                }
                // check serial
                if (chip.serial) {
                    let id = chip.id;
                    let x = chip.image.x;
                    let y = chip.image.y;
                    for (let cy = 0; cy < chip.vertical; ++cy) {
                        for (let cx = 0; cx < chip.horizontal; ++cx) {
                            let data = JSON.parse(JSON.stringify(chip));
                            data.id = id;
                            data.image.file = tile.file;
                            data.image.x = x + cx * chip.image.width;
                            data.image.y = y + cy * chip.image.height;
                            tileInfo[id] = data;
                            ++id;
                        }
                    }
                } else {
                    tileInfo[chip.id] = chip;
                    tileInfo[chip.id].file = tile.file;
                }
            }
        }
    }

    /**
     * Build entity information
     * @param {JSON} entityInfo Entity informmation for building
     * @param {JSON} entities Entity information from file
     */
    buildEntityInfo(entityInfo, entities) {
        // set default info
        let defaultCollider = {
            type: `Rectangle`,
            startX: 0,
            startY: 0,
            width: 0,
            height: 0,
        };
        let defaultMaterial = {
            mass: 10,
            elasticity: 0.1,
            mu: 0.65,
        };
        let defaultBBody = {
            type: `MaxAdopt`,
            material: {
                type: `Immutable`,
                k: 0.5,
                frictionX: 1.0,
                frictionY: 0.0,
            },
        };
        for (let entity of entities.entities) {
            // set default collider
            if (entity.collider === undefined) {
                entity.collider = JSON.parse(JSON.stringify(defaultCollider));
                entity.collider.width = entity.width;
                entity.collider.height = entity.height;
            }
            // set default material
            if (entity.material === undefined) {
                entity.material = JSON.parse(JSON.stringify(defaultMaterial));
            }
            // set default body
            if (entity.body === undefined) {
                entity.body = JSON.parse(JSON.stringify(defaultBBody));
            }
            // check serial
            if (entity.image !== undefined && entity.image.type == `anime`) {
                let animation = [];
                for (let it of entity.image.animation) {
                    if (it.serial) {
                        for (let cy = 0; cy < it.vertical; ++cy) {
                            for (let cx = 0; cx < it.horizontal; ++cx) {
                                let data = JSON.parse(JSON.stringify(it));
                                data.x = it.x + cx * it.width;
                                data.y = it.y + cy * it.height;
                                animation.push(data);
                            }
                        }
                    } else {
                        animation.push(it);
                    }
                }
                entity.image.animation = animation;
            }
            // check multi serial
            if (entity.image !== undefined && entity.image.type == `multianime`) {
                let animations = [];
                for (let it of entity.image.animations) {
                    if (it.serial && it.names !== undefined) {
                        let index = 0;
                        let number = 0;
                        let animation = [];
                        for (let cy = 0; cy < it.vertical; ++cy) {
                            for (let cx = 0; cx < it.horizontal; ++cx) {
                                let data = {};
                                data.x = it.x + cx * it.width;
                                data.y = it.y + cy * it.height;
                                data.width = it.width;
                                data.height = it.height;
                                data.delta = it.delta;
                                animation.push(data);
                                if (++number == it.number) {
                                    for (let i = 0; i < it.names[index].length; ++i) {
                                        let item = {};
                                        item.name = it.names[index][i];
                                        item.loop = it.loops[index][i];
                                        if (it.deltas !== undefined) {
                                            for (let anime of animation) {
                                                anime.delta = it.deltas[index][i];
                                            }
                                        }
                                        item.animation = JSON.parse(JSON.stringify(animation));
                                        animations.push(item);
                                    }
                                    animation.length = [];
                                    number = 0;
                                    index++;
                                }
                            }
                        }
                    } else {
                        let animation = [];
                        for (let e of it.animation) {
                            if (e.serial) {
                                for (let cy = 0; cy < e.vertical; ++cy) {
                                    for (let cx = 0; cx < e.horizontal; ++cx) {
                                        let data = JSON.parse(JSON.stringify(e));
                                        data.x = e.x + cx * e.width;
                                        data.y = e.y + cy * e.height;
                                        animation.push(data);
                                    }
                                }
                            } else {
                                animation.push(e);
                            }
                        }
                        it.animation = animation;
                        animations.push(it);
                    }
                }
                entity.image.animations = animations;
            }
            entityInfo[entity.id] = entity;
        }
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
        this.buildTileInfo(stage.tileInfo, tiles);
        // make entity information
        stage.entityInfo = {};
        stage.entityInfo.entities = stage.entities;
        this.buildEntityInfo(stage.entityInfo, entities);

        // make stage
        let base = this.makeBaseStage(stage);
        base.setMap(this.makeMap(stage.map));
        base.setCamera(this.makeBaseCamera(stage.camera, width, height));
        base.setPhysicalWorld(this.makeBaseWorld(stage, stage.world));
        base.getPhysicalWorld().setResponse(this.makePhysicalResponse());
        let layerIndex = 0;
        // make tile
        for (let layer of stage.layers) {
            for (let chip of layer) {
                this.addTile(base, layerIndex, chip, stage.tileInfo);
            }
            layerIndex += 1;
        }
        // make entity
        for (let entity of stage.deploy) {
            this.addEntity(base, layerIndex, entity, stage.entityInfo);
        }
        return base;
    }
}

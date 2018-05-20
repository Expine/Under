/**
 * JSON entity factory
 * - Generates entity by ID
 * - ### Generates from JSON data
 * @extends {EntityFactory}
 * @classdesc JSON entity factory to generate from JSON data
 */
class JSONEntityFactory extends EntityFactory { // eslint-disable-line  no-unused-vars
    /**
     * JSON entity factory
     * @constructor
     * @param {EntityBuilder} [tile = TileBuilder] Tile builder instance
     * @param {EntityBuilder} [chara = CharacterBuilder] Character builder instance
     * @param {EventBuilder} [event = EventBuilder] Event builder instance
     * @param {ImageBuilder} [image = BaseImageBuilder] Image builder instance
     */
    constructor(tile = new TileBuilder(), chara = new CharacterBuilder(), event = new SimpleEventBuilder(), image = new BaseImageBuilder()) {
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

        /**
         * Image builder instance
         * @protected
         * @type {ImageBuilder}
         */
        this.imageBuilder = image;

        /**
         * Tile information by JSON
         * @protected
         * @type {Object<number, JSON>}
         */
        this.tileInfo = {};
        /**
         * Entity information by JSON
         * @protected
         * @type {Object<number, JSON>}
         */
        this.entityInfo = {};

        // initialize
        this.tileBuilder.setImageBuilder(image);
        this.characterBuilder.setImageBuilder(image);
        this.eventBuilder.setImageBuilder(image);
    }

    /**
     * Add entity information
     * @param {JSON} entityInfo Entity information JSON data
     */
    addEntityInfo(entityInfo) {
        this.buildEntityInfo(entityInfo);
    }

    /**
     * Add tile information
     * @param {JSON} tileInfo Tile information JSON data
     */
    addTileInfo(tileInfo) {
        this.buildTileInfo(tileInfo);
    }

    /**
     * Build entity information
     * @protected
     * @param {JSON} entityInfo Added entity information
     */
    buildEntityInfo(entityInfo) {
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
        for (let entity of entityInfo.entities) {
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
            this.entityInfo[entity.id] = entity;
        }
    }

    /**
     * Build tile information
     * @protected
     * @param {JSON} tileInfo Added tile information
     */
    buildTileInfo(tileInfo) {
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
        for (let tile of tileInfo.tiles) {
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
                            this.tileInfo[id] = data;
                            ++id;
                        }
                    }
                } else {
                    this.tileInfo[chip.id] = chip;
                    this.tileInfo[chip.id].file = tile.file;
                }
            }
        }
    }

    /**
     * Create entity from factory data
     * @override
     * @param {Object} id ID for entity
     * @param {JSON} deploy Entity deploy json data
     * @return {Entity} Entity instance
     */
    createEntity(id, deploy) {
        let ret = null;
        let info = null;
        if (this.tileInfo[id] !== undefined) {
            // build tile
            info = this.tileInfo[id];
            ret = this.tileBuilder.build(deploy, info);
        } else {
            info = this.entityInfo[id];
            ret = this.characterBuilder.build(deploy, info);
        }
        if (BaseUtil.implementsOf(ret, IEventEntity)) {
            let event = (deploy === undefined || deploy.event === undefined) ? info.event : deploy.event;
            ret.setEvent(this.eventBuilder.build(event));
        }
        return ret;
    }
}

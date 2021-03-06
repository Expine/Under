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
     * Override value from data to base
     * @param {JSON} base Base data
     * @param {JSON} data Override data
     */
    overrideValue(base, data) {
        for (const it in data) {
            if (data.hasOwnProperty(it)) {
                if (base[it] === undefined || base[it] instanceof Array || !isNaN(base[it]) || data[it] === null) {
                    base[it] = data[it] === null ? undefined : data[it];
                } else {
                    this.overrideValue(base[it], data[it]);
                }
            }
        }
    }

    /**
     * Build entity information
     * @protected
     * @param {JSON} entityInfo Added entity information
     */
    buildEntityInfo(entityInfo) {
        // set default info
        const defaultCollider = {
            type: `Rectangle`,
            startX: 0,
            startY: 0,
            width: 0,
            height: 0,
        };
        const defaultMaterial = {
            mass: 10,
            elasticity: 0.1,
            mu: 0.65,
        };
        const defaultBBody = {
            type: `MaxAdopt`,
            material: {
                type: `Immutable`,
                k: 0.5,
                frictionX: 1.0,
                frictionY: 0.0,
            },
        };
        for (const entity of entityInfo.entities) {
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
            if (entity.image !== undefined && entity.image.type === `anime`) {
                const animation = [];
                for (const it of entity.image.animation) {
                    if (it.serial) {
                        for (let cy = 0; cy < it.vertical; ++cy) {
                            for (let cx = 0; cx < it.horizontal; ++cx) {
                                const data = JSON.parse(JSON.stringify(it));
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
            if (entity.image !== undefined && entity.image.type === `multianime`) {
                const animations = [];
                for (const it of entity.image.animations) {
                    if (it.serial && it.names !== undefined) {
                        const animation = [];
                        let index = 0;
                        let number = 0;
                        for (let cy = 0; cy < it.vertical; ++cy) {
                            for (let cx = 0; cx < it.horizontal; ++cx) {
                                const data = {};
                                data.x = it.x + cx * it.width;
                                data.y = it.y + cy * it.height;
                                data.width = it.width;
                                data.height = it.height;
                                data.delta = it.delta;
                                animation.push(data);
                                if (++number === it.number) {
                                    for (let i = 0; i < it.names[index].length; ++i) {
                                        const item = {};
                                        item.name = it.names[index][i];
                                        item.loop = it.loops[index][i];
                                        if (it.deltas !== undefined) {
                                            for (const anime of animation) {
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
                        const animation = [];
                        for (const e of it.animation) {
                            if (e.serial) {
                                for (let cy = 0; cy < e.vertical; ++cy) {
                                    for (let cx = 0; cx < e.horizontal; ++cx) {
                                        const data = JSON.parse(JSON.stringify(e));
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
     * Build sirial chip data
     * @protected
     * @param {JSON} data Target base json data
     * @param {JSON} chip Serial chip information
     */
    buildChipSerial(data, chip) {}

    /**
     * Build tile information
     * @protected
     * @param {JSON} tileInfo Added tile information
     */
    buildTileInfo(tileInfo) {
        // set default info
        const defaultCollider = {
            type: `Rectangle`,
            startX: 0,
            startY: 0,
            width: 0,
            height: 0,
        };
        const defaultMaterial = {
            mass: 10,
            elasticity: 0.1,
            mu: 0.65,
        };
        for (const tile of tileInfo.tiles) {
            for (const chip of tile.chips) {
                // set default collider
                if (this.tileInfo[chip.id] === undefined && chip.collider === undefined) {
                    chip.collider = JSON.parse(JSON.stringify(defaultCollider));
                    chip.collider.width = chip.width;
                    chip.collider.height = chip.height;
                }
                // set default material
                if (this.tileInfo[chip.id] === undefined && chip.material === undefined) {
                    chip.material = JSON.parse(JSON.stringify(defaultMaterial));
                }
                // check serial
                if (chip.serial) {
                    let id = chip.id;
                    const x = chip.image.x;
                    const y = chip.image.y;
                    for (let cy = 0; cy < chip.vertical; ++cy) {
                        for (let cx = 0; cx < chip.horizontal; ++cx) {
                            const data = JSON.parse(JSON.stringify(chip));
                            data.id = id;
                            data.image.file = tile.file;
                            data.image.x = x + cx * chip.image.width;
                            data.image.y = y + cy * chip.image.height;
                            this.buildChipSerial(data, chip);
                            if (this.tileInfo[id] === undefined) {
                                this.tileInfo[id] = data;
                            } else {
                                this.overrideValue(this.tileInfo[id], data);
                            }
                            ++id;
                        }
                    }
                } else {
                    if (this.tileInfo[chip.id] === undefined) {
                        chip.image.file = tile.file;
                        this.tileInfo[chip.id] = chip;
                    } else {
                        this.overrideValue(this.tileInfo[chip.id], chip);
                    }
                }
            }
        }
    }

    /**
     * Build event
     * @protected
     * @param {Entity} base Based entity for setting event
     * @param {JSON} deploy Entity deploy json data
     */
    buildEvent(base, deploy) {
        if (deploy !== undefined && deploy.event !== undefined) {
            if (BaseUtil.implementsOf(base, IEventEntity)) {
                base.setEvent(this.eventBuilder.build(deploy.event));
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
        this.buildEvent(ret, deploy);
        return ret;
    }
}

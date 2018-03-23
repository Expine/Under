/**
 * JSON parser to generate stage
 * It can also be used as a builder pattern
 * @implements {StageParser}
 * @classdesc JSON parser to generate stage
 */
class JSONStageParser extends StageParser { // eslint-disable-line  no-unused-vars
    /**
     * Make base stage for parsing stage
     * @protected
     * @return {Stage} stage instance for base of parsing
     */
    makeBaseStage() {
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
     * Make collider
     * @param {json} collider Collider information json data
     * @return {Collider} Collider
     */
    makeCollider(collider) {
        if (collider.type == `Rectangle`) {
            return new RectangleCollider(collider.startX, collider.startY, collider.width, collider.height);
        } else if (collider.type == `Circle`) {
            return new CircleCollider(ret.radius, ret.shiftX, ret.shiftY);
        } else if (collider.type == `RoundRectangle`) {
            return new RoundRectangleCollider(collider.startX, collider.startY, collider.width, collider.height, collider.cut);
        }
    }

    /**
     * Make material
     * @param {json} material Material information json data
     * @return {Material} Material
     */
    makeMaterial(material) {
        return new DefaultMaterial(material.mass, material.elasticity, material.mu);
    }

    /**
     * Make underlying tile object
     * @protected
     * @param {json} tile Tile information json data
     * @param {json} chip Chip actually placed json data
     * @return {TileObject} Underlying tile object
     */
    makeTileBase(tile, chip) {
        return new TileObject(tile.x, tile.y, tile.width, tile.height, chip.x, chip.y, chip.width, chip.height, tile.file);
    }

    /**
     * Make tile object
     * @protected
     * @param {json} tile Tile information json data
     * @param {json} chip Chip actually placed json data
     * @return {TileObject} Tile object
     */
    makeTileObject(tile, chip) {
        let base = this.makeTileBase(tile, chip);
        // set collider
        base.setCollider(this.makeCollider(tile.collider));
        // set material
        base.setMaterial(this.makeMaterial(tile.material));
        return base;
    }

    /**
     * Make rigid body
     * @param {json} body Rigid body information json data
     * @return {RigidBody} RigidBody
     */
    makeBody(body) {
        if (body.type == `MaxAdopt`) {
            return new MaxAdoptBody();
        }
    }

    /**
     * Make animation
     * @protected
     * @param {json} anime Animation json data
     * @return {NamedAnimation} Animation
     */
    makeAnimation(anime) {
        let base = new MultiNamedAnimation();
        let id = ContextImage.it.loadImage(`res/image/chara/${anime.file}`);
        for (let it of anime.animation) {
            base.setName(`${it.direction.x}-${it.direction.y}`).setAnimation(new SingleAnimation());
            for (let e of it.list) {
                base.addAnimation(new AnimationElement(id, e.srcX, e.srcY, e.srcW, e.srcH, e.delta));
            }
        }
        return base;
    }

    /**
     * Make AI
     * @param {json} ai AI information json data
     * @param {json} animation AI animation json data
     * @return {AI} AI
     */
    makeAI(ai, animation) {
        let ret = eval(`new ${ai.name}()`);
        if (ret instanceof StateAI) {
            for (let name in animation) {
                if (animation.hasOwnProperty(name)) {
                    let target = ret.getStateByName(name);
                    if (target instanceof BaseState) {
                        target.setStateAnimaton(this.makeAnimation(animation[name]));
                    }
                }
            }
        }
        return ret;
    }

    /**
     * Make underlying entity
     * @protected
     * @param {json} info Entity information json data
     * @param {json} entity Entity actually placed json data
     * @return {Entity} Underlying entity
     */
    makeEntityBase(info, entity) {
        if (info.type == `Player`) {
            return new Player(entity.x, entity.y, info.width, info.height, info.fileID);
        } else if (info.type == 'Enemy') {
            return new Enemy(entity.x, entity.y, info.width, info.height, info.fileID);
        }
    }

    /**
     * Make entity
     * @protected
     * @param {json} info Entity information json data
     * @param {json} entity Entity actually placed json data
     * @return {Entity} Entity
     */
    makeEntity(info, entity) {
        let base = this.makeEntityBase(info, entity);
        base.setCollider(this.makeCollider(info.collider));
        base.setMaterial(this.makeMaterial(info.material));
        base.setRigidBody(this.makeBody(info.body));
        for (let ai of info.ai) {
            base.addAI(this.makeAI(ai, info.animation));
        }
        return base;
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
        // Load stage file
        let req = new XMLHttpRequest();
        req.open(`GET`, filePath, false);
        req.send(null);
        // get stage file data
        let json = JSON.parse(req.responseText);
        // make stage
        let stage = this.makeBaseStage();
        stage.setMap(this.makeBaseMap(json.map));
        stage.setCamera(this.makeBaseCamera(json.camera, width, height));
        stage.setPhysicalWorld(this.makeBaseWorld());
        // make tile
        let tiles = {};
        for (let tile of json.tiles) {
            let fileID = ContextImage.it.loadImage(`res/image/tile/${tile.file}`);
            for (let chip of tile.chips) {
                tiles[chip.id] = chip;
                tiles[chip.id].file = fileID;
            }
        }
        for (let layer of json.layers) {
            for (let chip of layer) {
                stage.addEntity(this.makeTileObject(tiles[chip.id], chip));
            }
        }
        // make entity
        let info = {};
        for (let entity of json.entities.info) {
            info[entity.id] = entity;
            info[entity.id].fileID = ContextImage.it.loadImage(`res/image/chara/${entity.file}`);
        }
        for (let entity of json.entities.deploy) {
            stage.addEntity(this.makeEntity(info[entity.id], entity));
        }
        return stage;
    }
}

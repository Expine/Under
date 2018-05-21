/**
 * JSON stage parser
 * - Generates a stage from a file
 * - ### Parses JSON file
 * @extends {StageParser}
 * @classdesc JSON stage parser to parse JSON file
 */
class JSONStageParser extends StageParser { // eslint-disable-line  no-unused-vars
    /**
     * JSON stage parser
     * @param {ImageBuilder} [image = BaseImageBuilder] Image builder instance
     */
    constructor(image = new BaseImageBuilder()) {
        super();
        /**
         * Image builder instance
         * @protected
         * @type {ImageBuilder}
         */
        this.imageBuilder = image;
    }

    /**
     * Make background image
     * @protected
     * @param {JSON} image Background image json data
     * @return {GameImage} Background image
     */
    makeBackgroundImage(image) {
        return this.imageBuilder.build(`back`, image);
    }

    /**
     * Make base stage for parsing stage
     * @protected
     * @param {JSON} stage Stage json data
     * @return {Stage} Stage instance for base of parsing
     */
    makeBaseStage(stage) {
        let ret = new SplitManagementStage(stage.width, stage.height);
        return ret;
    }

    /**
     * Make background for parsing stage
     * @protected
     * @param {JSON} back Background json data
     * @return {Background} Background instance for base of parsing
     */
    makeBackground(back) {
        switch (back.type) {
            case `Sequential`:
                let ret = new SequentialBackground();
                for (let it of back.backs) {
                    ret.addBackground(this.makeBackground(it));
                }
                return ret;
            case `Invariant`:
                return new InvariantBackground(this.makeBackgroundImage(back.image));
            case `Movement`:
                return new MovementBackground(this.makeBackgroundImage(back.image), back.x, back.y, back.rx, back.ry);
            case `Area`:
                return new AreaBackground(this.makeBackgroundImage(back.image), back.x, back.y, back.width, back.height);
            case `Fixed`:
                return new FixedBackBackground(this.makeBackgroundImage(back.image), back.x, back.y);
            default:
                return null;
        }
    }

    /**
     * Make base camera for parsing stage
     * @protected
     * @param {JSON} camera Camera json data
     * @return {Camera} Camera instance for base of parsing
     */
    makeBaseCamera(camera) {
        let ret = null;
        if (camera.type === `center`) {
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
        switch (world.type) {
            case `sequential`:
                return new SequentialWorld();
            case `split`:
                return new SplitWorld(stage.width, stage.height);
            case `gravity`:
                {
                    let ret = new VariableGravityWorld(stage.width, stage.height);
                    for (let it of world.gravity) {
                        ret.addGravity(it.x, it.y, it.delta);
                    }
                    return ret;
                }
            default:
                return null;
        }
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
     * Make entity factory
     * @protected
     * @param {JSON} stage Stage json data
     * @return {EntityFactory} Entity factory
     */
    makeEntityFactory(stage) {
        let ret = new JSONEntityFactory();
        for (let it of stage.tiles) {
            ret.addTileInfo(JSON.parse(Util.loadFile(`src/res/stage/${it}`)));
        }
        for (let it of stage.entities) {
            ret.addEntityInfo(JSON.parse(Util.loadFile(`src/res/stage/${it}`)));
        }
        return ret;
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
        // make stage
        let base = this.makeBaseStage(stage);
        base.setBackground(this.makeBackground(stage.background));
        base.setCamera(this.makeBaseCamera(stage.camera));
        base.getCamera().setScreenSize(width, height);
        base.getCamera().setMaxSize(base.getStageWidth(), base.getStageHeight());
        base.setPhysicalWorld(this.makeBaseWorld(stage, stage.world));
        base.getPhysicalWorld().setResponse(this.makePhysicalResponse());
        base.setFactory(this.makeEntityFactory(stage));
        let layerIndex = 0;
        // make tile
        for (let layer of stage.layers) {
            for (let chip of layer) {
                if (chip.z === undefined) {
                    chip.z = layerIndex;
                }
                base.addEntityByID(chip.id, chip);
            }
            layerIndex += 1;
        }
        // make entity
        for (let entity of stage.deploy) {
            if (entity.z === undefined) {
                entity.z = layerIndex;
            }
            base.addEntityByID(entity.id, entity);
        }
        return base;
    }
}

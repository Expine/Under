/**
 * Default parser to generate stage
 * It can also be used as a builder pattern
 * @implements {StageParser}
 * @classdesc Default parser to generate stage
 */
class ConcreteStageParser extends StageParser { // eslint-disable-line  no-unused-vars
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
     * @param {number} imageID background image id
     * @param {number} width map width
     * @param {height} height map height
     * @return {Map} map instance for base of parsing
     */
    makeBaseMap(imageID, width, height) {
        let map = new InvariantBackMap(width, height);
        map.setBackground(imageID);
        return map;
    }

    /**
     * Make base camera for parsing stage
     * @protected
     * @return {Camera} camera instance for base of parsing
     */
    makeBaseCamera(width, height) {
        return new CenterCamera(width, height);
    }

    /**
     * Make base phisical world for parsing stage
     * @protected
     * @return {PhysicalWorld} Physical world instance for base of parsing
     */
    makeBaseWorld() {
        return new SequentialWorld();
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
        let lines = req.responseText.split(`\n`);
        let stageBaseData = lines[0].split(`,`);
        let tileBaseData = lines[1].split(`,`);
        let stageData = lines[2].split(`,`);
        // set base data
        let backID = Context.image.loadImage(`res/image/back/` + stageBaseData[0]);
        let stageWidth = parseInt(stageBaseData[1]);
        let stageHeight = parseInt(stageBaseData[2]);
        let tileID = Context.image.loadImage(`res/image/tile/` + tileBaseData[0]);
        let tileWidth = parseInt(tileBaseData[1]);
        let tileHeight = parseInt(tileBaseData[2]);
        let tileHorizontalNumber = parseInt(tileBaseData[3]);
        // let tileVerticalNumber = parseInt(tileBaseData[4]);

        // set base
        let stage = this.makeBaseStage();
        stage.setMap(this.makeBaseMap(backID, stageWidth * tileWidth, stageHeight * tileHeight));
        stage.setCamera(this.makeBaseCamera(width, height));
        stage.setPhysicalWorld(this.makeBaseWorld());
        // set tile
        for (let y = 0; y < stageHeight; ++y) {
            for (let x = 0; x < stageWidth; ++x) {
                let id = parseInt(stageData[x + y * stageWidth]);
                if (id > -1) {
                    let entity = new TileObject(Math.floor(id / tileHorizontalNumber), id % tileHorizontalNumber, tileWidth, tileHeight, x * tileWidth, y * tileHeight, tileWidth, tileHeight, tileID);
                    entity.setCollider(new RectangleCollder(entity, 0, 0, tileWidth, tileHeight));
                    // entity.setCollider(new CircleCollider(entity, tileWidth / 2));
                    stage.addEntity(entity);
                }
            }
        }
        return stage;
    }
}
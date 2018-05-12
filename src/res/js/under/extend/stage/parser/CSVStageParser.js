/**
 * CSV stage parser
 * - Generates a stage from a file
 * - ### Parses CSV file
 * @extends {StageParser}
 * @classdesc CSV stage parser to parse CSV file
 */
class CSVStageParser extends StageParser { // eslint-disable-line  no-unused-vars
    /**
     * Make base stage for parsing stage
     * @protected
     * @param {number} width Stage width
     * @param {height} height Stage height
     * @return {Stage} Stage instance for base of parsing
     */
    makeBaseStage(width, height) {
        return new SplitManagementStage(width, height);
    }

    /**
     * Make base background for parsing stage
     * @protected
     * @param {number} imageID Background image id
     * @return {Background} Background instance for base of parsing
     */
    makeBaseBackground(imageID) {
        return new InvariantBackground(imageID);
    }

    /**
     * Make base camera for parsing stage
     * @protected
     * @param {number} width Camera width
     * @param {height} height Camera height
     * @return {Camera} Camera instance for base of parsing
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
        let world = new SequentialWorld();
        world.setResponse(new RepulsionResponse());
        return world;
    }

    /**
     * Make tile object
     * @protected
     * @param {number} verticalId Tile vertical id
     * @param {number} horizontalId Tile horizontal id
     * @param {number} tileWidth Tile width
     * @param {number} tileHeight Tile height
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} width Object width
     * @param {number} height Object height
     * @param {number} imageID Tile image id
     * @return {TileObject} Tile object
     */
    makeTileObject(verticalId, horizontalId, tileWidth, tileHeight, x, y, width, height, imageID) {
        let tile = new TileObject(horizontalId * tileWidth, verticalId * tileHeight, tileWidth, tileHeight, x, y, width, height, imageID);
        tile.setCollider(new RectangleCollider(0, 0, width, height));
        tile.setMaterial(new ImmutableMaterial());
        return tile;
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
        let backID = ResourceManager.image.load(`back/` + stageBaseData[0]);
        let stageWidth = parseInt(stageBaseData[1]);
        let stageHeight = parseInt(stageBaseData[2]);
        let tileID = ResourceManager.image.load(`tile/` + tileBaseData[0]);
        let tileWidth = parseInt(tileBaseData[1]);
        let tileHeight = parseInt(tileBaseData[2]);
        let tileHorizontalNumber = parseInt(tileBaseData[3]);

        // set base
        let stage = this.makeBaseStage(stageWidth * tileWidth, stageHeight * tileHeight);
        stage.setBackground(this.makeBaseBackground(backID));
        stage.setCamera(this.makeBaseCamera(width, height));
        stage.setPhysicalWorld(this.makeBaseWorld());
        // set tile
        for (let y = 0; y < stageHeight; ++y) {
            for (let x = 0; x < stageWidth; ++x) {
                let id = parseInt(stageData[x + y * stageWidth]);
                if (id > -1) {
                    stage.addEntity(this.makeTileObject(Math.floor(id / tileHorizontalNumber), id % tileHorizontalNumber, tileWidth, tileHeight, x * tileWidth, y * tileHeight, tileWidth, tileHeight, tileID));
                }
            }
        }
        return stage;
    }
}

/**
 * CSV parser to generate stage
 * It can also be used as a builder pattern
 * @implements {StageParser}
 * @classdesc CSV parser to generate stage
 */
class CSVStageParser extends StageParser { // eslint-disable-line  no-unused-vars
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
        return new InvariantBackMap(imageID, width, height);
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
        let world = new SequentialWorld();
        world.setResponse(new RepulsionResponse());
        return world;
    }

    /**
     * Make tile object
     * @protected
     * @param {number} verticalId tile vertical id
     * @param {number} horizontalId tile horizontal id
     * @param {number} tileWidth tile width
     * @param {number} tileHeight tile height
     * @param {number} x x position
     * @param {number} y y position
     * @param {number} width object width
     * @param {number} height object height
     * @param {number} imageID tile image id
     * @return {TileObject} tile object
     */
    makeTileObject(verticalId, horizontalId, tileWidth, tileHeight, x, y, width, height, imageID) {
        let tile = new TileObject(horizontalId * tileWidth, verticalId * tileHeight, tileWidth, tileHeight, x, y, width, height, imageID);
        tile.setCollider(new RectangleCollider(0, 0, width, height));
        tile.setMaterial(new DefaultMaterial());
        return tile;
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
        let backID = ContextImage.it.loadImage(`back/` + stageBaseData[0]);
        let stageWidth = parseInt(stageBaseData[1]);
        let stageHeight = parseInt(stageBaseData[2]);
        let tileID = ContextImage.it.loadImage(`tile/` + tileBaseData[0]);
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
                    stage.addEntity(this.makeTileObject(Math.floor(id / tileHorizontalNumber), id % tileHorizontalNumber, tileWidth, tileHeight, x * tileWidth, y * tileHeight, tileWidth, tileHeight, tileID));
                }
            }
        }
        return stage;
    }
}

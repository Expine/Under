/**
 * Default stage parser sample
 * @implements {StageParser}
 * @classdesc Stage parser sample
 */
class DefaultStageParser extends StageParser {
    /**
     * Make base stage for parsing stage
     * @protected
     * @return {Stage} stage instance for base of parsing
     */
    makeBaseStage() {
        return new DefaultStage();
    }

    /**
     * Make base map for parsing stage
     * @protected
     * @param {number} width map width
     * @param {height} height map height
     * @return {Map} map instance for base of parsing
     */
    makeBaseMap(width, height) {
        return new DefaultMap(width, height);
    }

    /**
     * Make base camera for parsing stage
     * @protected
     * @return {Camera} camera instance for base of parsing
     */
    makeBaseCamera(width, height) {
        return new DefaultCamera(width, height);
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
        req.open("GET", filePath, false);
        req.send(null);
        let lines = req.responseText.split("\n");
        let stageBaseData = lines[0].split(",");
        let tileBaseData = lines[1].split(",");
        let stageData = lines[2].split(",");
        // set base data
        let stageWidth = parseInt(stageBaseData[0]);
        let stageHeight = parseInt(stageBaseData[1]);
        let tile = new Image();
        tile.src = "res/image/tile/" + tileBaseData[0];
        let tileWidth = parseInt(tileBaseData[1]);
        let tileHeight = parseInt(tileBaseData[2]);
        let tileHorizontalNumber = parseInt(tileBaseData[3]);
        let tileVerticalNumber = parseInt(tileBaseData[4]);

        //set base
        let stage = this.makeBaseStage();
        stage.setMap(this.makeBaseMap(stageWidth * tileWidth, stageHeight * tileHeight));
        stage.setCamera(this.makeBaseCamera(width, height));
        for (let y = 0; y < stageHeight; ++y) {
            for (let x = 0; x < stageWidth; ++x) {
                let id = parseInt(stageData[x + y * stageWidth]);
                if (id > -1) {
                    let entity = new DefaultImmutableObject(Math.floor(id / tileHorizontalNumber), id % tileHorizontalNumber, tileWidth, tileHeight, x * tileWidth, y * tileHeight, tileWidth, tileHeight, tile);
                    entity.setCollider(new CircleCollider(entity, Math.max(tileWidth, tileHeight) / 2));
                    stage.addEntity(entity);
                }
            }
        }
        return stage;
    }
}
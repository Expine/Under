/**
 * Editor stage parser to generate stage
 * @implements {CSVStageParser}
 * @classdesc Editor stage parser to generate stage
 */
class EditorStageParser extends CSVStageParser { // eslint-disable-line  no-unused-vars
    /**
     * Make base stage for parsing stage
     * @protected
     * @return {Stage} stage instance for base of parsing
     */
    makeBaseStage() {
        return new EditorStage();
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
}

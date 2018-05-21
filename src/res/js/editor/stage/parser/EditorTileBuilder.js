/**
 * Under tile builder
 * - Generates entity from json data
 * - Generate tile from json data
 * - Generates unique tile object
 * - ### Generates editor tile object
 * @extends {UnderTileBuilder}
 * @classdesc Under tile builder to generates editor tile object
 */
class EditorTileBuilder extends UnderTileBuilder { // eslint-disable-line  no-unused-vars
    /**
     * Build tile from json data
     * @override
     * @param {JSON} deploy Entity deploy json data
     * @param {JSON} json tile json data
     * @return {Entity} Generated tile
     */
    build(deploy, json) {
        let ret = super.build(deploy, json);
        ret = new EditorTile(ret, json.id, json.autoID);
        return ret;
    }
}

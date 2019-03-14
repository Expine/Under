/**
 * Under tile builder
 * - Generates entity from json data
 * - Generate tile from json data
 * - Generates unique tile object
 * - ### Generates editor tile object
 * @extends {UnderTileBuilder}
 * @classdesc Under tile builder to generates editor tile object
 */
class EditorTileBuilder extends UnderTileBuilder {
    /**
     * Build tile from json data
     * @override
     * @param {JSON} deploy Entity deploy json data
     * @param {JSON} json tile json data
     * @return {Entity} Generated tile
     */
    build(deploy, json) {
        return new EditorTile(super.build(deploy, json), deploy, json.id, json.autoID);
    }
}

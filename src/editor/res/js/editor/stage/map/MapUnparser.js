// TODO: Should be implement by Inheritance
/**
 * Map unparser
 * - ### Unparses from map to json
 * @classdesc Map unparser to unparse from map to json
 */
class MapUnparser { // eslint-disable-line  no-unused-vars
    /**
     * Load map resource path
     * @param {number} id Map image ID
     */
    static loadPath(id) {
        return ResourceManager.image.getPath(id).replace(`back/`, ``);
    }

    /**
     * Unparses from map to json
     * @param {Map} map Map to unparse
     * @return {JSON} Json data
     */
    static unparse(map) {
        let ret = {};
        if (map instanceof SequentialMap) {
            ret.type = `Sequential`;
            ret.backs = [];
            for (let it of map.maps) {
                ret.backs.push(MapUnparser.unparse(it));
            }
        } else if (map instanceof InvariantBackMap) {
            ret.type = `Invariant`;
            ret.file = MapUnparser.loadPath(map.getBackID());
        } else if (map instanceof MovementMap) {
            ret.type = `Movement`;
            ret.file = MapUnparser.loadPath(map.getBackID());
            ret.width = map.width;
            ret.height = map.height;
            ret.rx = map.speedRatioX;
            ret.ry = map.speedRatioY;
        } else if (map instanceof FixedBackMap) {
            ret.type = `Fixed`;
            ret.file = MapUnparser.loadPath(map.getBackID());
            ret.x = map.x;
            ret.y = map.y;
            ret.width = map.width;
            ret.height = map.height;
        }
        return ret;
    }
}

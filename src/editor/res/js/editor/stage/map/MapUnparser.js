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
    loadPath(id) {
        return ResourceManager.image.getPath(id).replace(`back/`, ``);
    }

    /**
     * Unparses from map to json
     * @param {Map} map Map to unparse
     * @return {JSON} Json data
     */
    unparse(map) {
        let ret = {};
        if (map instanceof SequentialMap) {
            ret.type = `Sequential`;
            ret.backs = [];
            for (let it of map.maps) {
                ret.backs.push(this.unparse(it));
            }
        } else if (map instanceof InvariantBackMap) {
            ret.type = `Invariant`;
            ret.file = this.loadPath(map.backID);
        } else if (map instanceof MovementMap) {
            ret.type = `Movement`;
            ret.file = this.loadPath(map.backID);
            ret.x = map.x;
            ret.y = map.y;
            ret.width = map.width;
            ret.height = map.height;
            ret.rx = map.speedRatioX;
            ret.ry = map.speedRatioY;
        } else if (map instanceof AreaMap) {
            ret.type = `Area`;
            ret.file = this.loadPath(map.backID);
            ret.x = map.x;
            ret.y = map.y;
            ret.width = map.width;
            ret.height = map.height;
            ret.areaW = map.areaHeight;
            ret.areaH = map.areaHeight;
        } else if (map instanceof FixedBackMap) {
            ret.type = `Fixed`;
            ret.file = this.loadPath(map.backID);
            ret.x = map.x;
            ret.y = map.y;
            ret.width = map.width;
            ret.height = map.height;
        }
        return ret;
    }
}

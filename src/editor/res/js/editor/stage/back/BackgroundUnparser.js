// TODO: Should be implement by Inheritance
/**
 * Background unparser
 * - ### Unparses from background to json
 * @classdesc Background unparser to unparse from background to json
 */
class BackgroundUnparser { // eslint-disable-line  no-unused-vars
    /**
     * Load background resource path
     * @param {number} id Background image ID
     */
    loadPath(id) {
        return ResourceManager.image.getPath(id).replace(`back/`, ``);
    }

    /**
     * Unparses from background to json
     * @param {Background} back Background to unparse
     * @return {JSON} Json data
     */
    unparse(back) {
        let ret = {};
        if (back instanceof SequentialBackground) {
            ret.type = `Sequential`;
            ret.backs = [];
            for (let it of back.backs) {
                ret.backs.push(this.unparse(it));
            }
        } else if (back instanceof InvariantBackground) {
            ret.type = `Invariant`;
            // ret.image = this.loadPath(back.backImage);
        } else if (back instanceof MovementBackground) {
            ret.type = `Movement`;
            // ret.image = this.loadPath(back.backID);
            ret.x = back.x;
            ret.y = back.y;
            ret.rx = back.speedRatioX;
            ret.ry = back.speedRatioY;
        } else if (back instanceof AreaBackground) {
            ret.type = `Area`;
            // ret.image = this.loadPath(back.backID);
            ret.x = back.x;
            ret.y = back.y;
            ret.width = back.areaHeight;
            ret.height = back.areaHeight;
        } else if (back instanceof FixedBackground) {
            ret.type = `Fixed`;
            // ret.image = this.loadPath(back.backID);
            ret.x = back.x;
            ret.y = back.y;
        }
        return ret;
    }
}

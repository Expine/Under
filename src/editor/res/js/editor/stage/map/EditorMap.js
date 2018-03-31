/**
 * Map for eidtor
 * @extends {SequentialMap}
 * @classdesc Map for eidtor
 */
class EditorMap extends SequentialMap { // eslint-disable-line  no-unused-vars
    /**
     * Get json data for saving
     * @return {json} Json data for saving
     */
    getSaveData() {
        let data = {};
        data.backs = [];
        for (let it of this.maps) {
            let map = {};
            if (it instanceof InvariantBackMap) {
                map.type = `Invariant`;
                map.file = ContextImage.it.getImagePath(it.getBackID()).replace(`src/res/image/back/`, ``);
            }
            data.backs.push(map);
        }
        data.width = this.width;
        data.height = this.height;
        return data;
    }
}

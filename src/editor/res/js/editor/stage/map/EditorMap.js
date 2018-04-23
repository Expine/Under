/**
 * Editor map
 * - Renders and update backgrdoun image
 * - Processes continuously
 * - ### It can be gotten save data
 * @extends {SequentialMap}
 * @classdesc Editor map that can be gotten save data
 */
class EditorMap extends SequentialMap { // eslint-disable-line  no-unused-vars
    /**
     * Get json data for saving
     * @return {JSON} Json data for saving
     */
    getSaveData() {
        let data = {};
        data.backs = [];
        for (let it of this.maps) {
            let map = {};
            if (it instanceof InvariantBackMap) {
                map.type = `Invariant`;
                map.file = ResourceManager.image.getPath(it.getBackID()).replace(`back/`, ``);
            }
            data.backs.push(map);
        }
        return data;
    }
}

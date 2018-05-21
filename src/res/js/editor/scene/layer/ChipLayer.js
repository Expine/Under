/**
 * Chip layer
 * - Performs drawing processing collectively
 * - It can manage layers by tab
 * - Shows name and it can tap name tab
 * - Selects something and set selected
 * - It can save data
 * - ### Selects chips
 * @extends {NamedTabbedLayer}
 * @implements {ISelection}
 * @implements {IEditorSave}
 * @classdesc Chip layer to select chips
 */
class ChipLayer extends NamedTabbedLayer /* , ISelection, IEditorSave */ { // eslint-disable-line  no-unused-vars
    /**
     * Chip layer constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Tile information
         * @protected
         * @type {Object<number, JSON>}
         */
        this.tileInfo = null;

        /**
         * List of chip layer
         * @protected
         * @type {Array<SelectionLayer>}
         */
        this.chipLayers = [];
        /**
         * Selected item
         * @protected
         * @type {ISelection}
         */
        this.selected = null;
    }

    /**
     * Set information for selection
     * @override
     * @param {JSON} info Selection information
     */
    setSelectionInfo(info) {
        this.tileInfo = {};
        for (const it in info) {
            if (info.hasOwnProperty(it) && !isNaN(it)) {
                const fileName = info[it].image.file;
                if (this.tileInfo[fileName] === undefined) {
                    this.tileInfo[fileName] = {};
                }
                this.tileInfo[fileName][it] = info[it];
            }
        }
    }

    /**
     * Get selected tile ID
     * @override
     * @return {number} Selected tile ID (return -1 if not selected)
     */
    getSelected() {
        return this.chipLayers[this.currentlyTabIndex].getSelected();
    }

    /**
     * Set selected tile by ID
     * @override
     * @param {number} id Tile ID
     */
    setSelected(id) {
        for (let i = 0; i < this.chipLayers.length; ++i) {
            this.chipLayers[i].setSelected(id);
            if (this.chipLayers[i].getSelected() !== -1) {
                this.currentlyTabIndex = i;
            }
        }
    }

    /**
     * Get json data for saving
     * @override
     * @return {JSON} Json data for saving
     */
    getSaveData() {
        const data = {};
        data.tiles = [];
        for (let i = 0; i < this.chipLayers.length; ++i) {
            const tile = {};
            tile.file = this.tabNames[i];
            tile.chips = this.chipLayers[i].getSaveData();
            data.tiles.push(tile);
        }
        return data;
    }

    /**
     * Initialize layer
     * @override
     */
    init() {
        for (const it in this.tileInfo) {
            if (this.tileInfo.hasOwnProperty(it)) {
                // create layer
                const layer = new SingleChipLayer(it);
                layer.setSelectionInfo(this.tileInfo[it]);
                this.chipLayers.push(layer);
                this.addTabWithName(new DragScrollLayer(layer), it);
            }
        }
    }

    /**
     * Render layer
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        ctx.fillRect(this.x, this.y, this.width, this.height, `green`);
        super.render(ctx);
    }
}

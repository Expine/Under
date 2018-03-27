/**
 * Chip layer
 * Selects chip
 * @implements {SelectionLayer}
 * @classdesc Chip layer to select chip
 */
class ChipLayer extends SelectionLayer { // eslint-disable-line  no-unused-vars
    /**
     * Chip layer constructor
     * @constructor
     * @param {Dictionary<number, json>} tileInfo Tile inforamtion json data
     */
    constructor(tileInfo) {
        super(tileInfo[0].file);
        /**
         * Tile inforamtion json data
         * @protected
         * @type {Dictionary<number, json>}
         */
        this.tileInfo = tileInfo;

        /**
         * Selection tile
         * @protected
         * @type {json}
         */
        this.selectTile = null;

        /**
         * Selected tile
         * @protected
         * @type {json}
         */
        this.selectedTile = null;
    }

    /**
     * Get selected tile ID
     * @override
     * @return {number} Selected tile ID (return -1 if not selected)
     */
    getSelected() {
        return this.selectedTile == null ? -1 : this.selectedTile.id;
    }

    /**
     * Set selected tile by ID
     * @override
     * @param {number} id Tile ID
     */
    setSelected(id) {
        this.selectedTile = this.tileInfo[id];
    }

    /**
     * Update layer
     * @override
     * @param {number} dt - delta time
     */
    update(dt) {
        this.selectTile = null;
        let x = Input.it.getMouseX() - this.x;
        let y = Input.it.getMouseY() - this.y;
        // check layer
        if (0 > x || x >= this.width || 0 > y || y >= this.height) {
            return;
        }
        for (let id in this.tileInfo) {
            if (this.tileInfo.hasOwnProperty(id)) {
                let tile = this.tileInfo[id];
                if (tile.x <= x && x < tile.x + tile.width && tile.y <= y && y < tile.y + tile.height) {
                    this.selectTile = tile;
                    break;
                }
            }
        }
        if (Input.it.isMousePress(Input.it.M.LEFT)) {
            this.selectedTile = this.selectTile;
        }
    }

    /**
     * Render layer
     * @override
     * @param {Context} ctx
     */
    render(ctx) {
        super.render(ctx);
        if (this.selectTile != null) {
            ctx.strokeRect(this.selectTile.x + this.x, this.selectTile.y + this.y, this.selectTile.width, this.selectTile.height, `red`);
        }
        if (this.selectedTile != null) {
            ctx.strokeRect(this.selectedTile.x + this.x, this.selectedTile.y + this.y, this.selectedTile.width, this.selectedTile.height, `white`);
        }
    }
}

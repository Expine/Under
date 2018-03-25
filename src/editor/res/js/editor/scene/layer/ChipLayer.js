/**
 * Chip layer
 * Selects chip
 * @implements {Layer}
 * @classdesc Chip layer to select chip
 */
class ChipLayer extends Layer { // eslint-disable-line  no-unused-vars
    /**
     * Chip layer constructor
     * @constructor
     * @param {Dictionary<number, json>} tileInfo Tile inforamtion json data
     */
    constructor(tileInfo) {
        super();
        /**
         * Tile inforamtion json data
         * @protected
         * @type {Dictionary<number, json>}
         */
        this.tileInfo = tileInfo;
        /**
         * Chip tile image ID
         * @protected
         * @type {number}
         */
        this.tileID = tileInfo[0].file;
        /**
         * Chip layer x position
         * @protected
         * @type {number}
         */
        this.x = 0;
        /**
         * Chip layer y position
         * @protected
         * @type {number}
         */
        this.y = 0;
        /**
         * Chip layer width
         * @protected
         * @type {number}
         */
        this.width = 0;
        /**
         * Chip layer height
         * @protected
         * @type {number}
         */
        this.height = 0;

        /**
         * Selection tile
         * @protected
         * @type {json}
         */
        this.selectTile = null;

        /**
         * Selected tile id
         * @protected
         * @type {number}
         */
        this.selectedTile = null;
    }

    /**
     * Set chip layer position
     * @param {number} x Chip layer x position
     * @param {number} y Chip layer y position
     * @param {number} width Chip layer width
     * @param {number} height Chip layer height
     */
    setPosition(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    /**
     * Get selected tile ID
     * @return {number} Selected tile ID (return -1 if not selected)
     */
    getSelectedTile() {
        return this.selectedTile == null ? -1 : this.selectedTile.id;
    }

    /**
     * Set selected tile by ID
     * @param {number} id Tile ID
     */
    setSelectedTile(id) {
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
        ctx.fillRect(this.x, this.y, this.width, this.height, `green`);
        ctx.drawImage(this.tileID, this.x, this.y);
        if (this.selectTile != null) {
            ctx.strokeRect(this.selectTile.x + this.x, this.selectTile.y + this.y, 32, 32, `red`);
        }
        if (this.selectedTile != null) {
            ctx.strokeRect(this.selectedTile.x + this.x, this.selectedTile.y + this.y, 32, 32, `white`);
        }
    }
}

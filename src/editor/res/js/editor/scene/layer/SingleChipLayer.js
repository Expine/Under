/**
 * Single chip layer
 * - Performs drawing processing collectively
 * - Selects something and set selected
 * - Selects something
 * - ### Selects chip
 * @implements {SelectionLayer}
 * @classdesc Single chip layer to select chip
 */
class SingleChipLayer extends SelectionLayer { // eslint-disable-line  no-unused-vars
    /**
     * Single chip layer constructor
     * @constructor
     * @param {Object<number, JSON>} tileInfo Tile inforamtion json data
     * @param {number} imageID Image ID
     */
    constructor(tileInfo, imageID) {
        super(imageID);
        /**
         * Tile inforamtion json data
         * @protected
         * @type {Object<number, JSON>}
         */
        this.tileInfo = tileInfo;

        /**
         * Selection tile
         * @protected
         * @type {JSON}
         */
        this.selectTile = null;

        /**
         * Selected tile
         * @protected
         * @type {JSON}
         */
        this.selectedTile = null;
    }

    /**
     * Get json data for saving
     * @return {JSON} Json data for saving
     */
    getSaveData() {
        let data = [];
        let list = [];
        // sort
        for (let it in this.tileInfo) {
            if (this.tileInfo.hasOwnProperty(it) && !isNaN(it)) {
                list.push(parseInt(it));
            }
        }
        list = list.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
        for (let it of list) {
            let info = Object.assign({}, this.tileInfo[`${it}`]);
            delete info.file;
            data.push(info);
        }
        return data;
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
        if (this.selectedTile === undefined) {
            this.selectedTile = null;
        }
    }

    /**
     * Update layer
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        super.update(dt);

        // tile selection
        this.selectTile = null;
        let x = Input.mouse.getMouseX() - this.x;
        let y = Input.mouse.getMouseY() - this.y;
        // check layer
        if (0 > x || x >= this.width || 0 > y || y >= this.height) {
            return;
        }
        x += this.clipX;
        y += this.clipY;
        for (let id in this.tileInfo) {
            if (this.tileInfo.hasOwnProperty(id)) {
                let tile = this.tileInfo[id];
                if (tile.image.x <= x && x < tile.image.x + tile.image.width && tile.image.y <= y && y < tile.image.y + tile.image.height) {
                    this.selectTile = tile;
                    break;
                }
            }
        }
        if (Input.mouse.isPress(Input.mouse.mLeft())) {
            this.selectedTile = this.selectTile;
        }
    }

    /**
     * Render layer
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        super.render(ctx);
        if (this.selectTile != null) {
            ctx.strokeRect(this.selectTile.image.x + this.x + this.clipX, this.selectTile.image.y + this.y - this.clipY, this.selectTile.image.width, this.selectTile.image.height, `red`);
        }
        if (this.selectedTile != null) {
            ctx.strokeRect(this.selectedTile.image.x + this.x + this.clipX, this.selectedTile.image.y + this.y - this.clipY, this.selectedTile.image.width, this.selectedTile.image.height, `white`);
        }
    }
}

/**
 * Single chip layer
 * - Performs drawing processing collectively
 * - Clips area when rendering
 * - Selects something and set selected
 * - It can save data
 * - Selects something
 * - ### Selects chip
 * @extends {ClipLayer}
 * @classdesc Single chip layer to select chip
 */
class SingleChipLayer extends SelectionLayer {
    /**
     * Single chip layer constructor
     * @constructor
     * @param {string} fileName Chip file path
     */
    constructor(fileName) {
        super();
        /**
         * Tile inforamtion json data
         * @protected
         * @type {Object<number, JSON>}
         */
        this.tileInfo = null;

        /**
         * Chip file path
         * @protected
         * @type {string}
         */
        this.fileName = fileName;
        /**
         * Tile image
         * @protected
         * @type {GameImage}
         */
        this.tileImage = null;

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
     * Set information for selection
     * @override
     * @param {JSON} info Selection information
     */
    setSelectionInfo(info) {
        this.tileInfo = info;
    }

    /**
     * Get selected tile ID
     * @override
     * @return {number} Selected tile ID (return -1 if not selected)
     */
    getSelected() {
        return this.selectedTile === null ? -1 : this.selectedTile.id;
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
     * Get json data for saving
     * @override
     * @return {JSON} Json data for saving
     */
    getSaveData() {
        const data = [];
        const list = [];
        // sort
        for (const it in this.tileInfo) {
            if (this.tileInfo.hasOwnProperty(it) && !isNaN(it)) {
                list.push(parseInt(it));
            }
        }
        list = list.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
        for (const it of list) {
            data.push(this.tileInfo[it]);
        }
        return data;
    }

    /**
     * Initialize layer
     * @override
     */
    init() {
        super.init();
        this.tileImage = new ClipImage(new SingleImage(ResourceManager.image.load(`tile/${this.fileName}`)));
        this.tileImage.init();
    }

    /**
     * Update layer
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        super.update(dt);

        this.tileImage.update(dt);
        if (BaseUtil.implementsOf(this.tileImage, IClipImage)) {
            this.tileImage.setClipArea(this.clipX, this.clipY, this.clipWidth, this.clipHeight);
        }
        // tile selection
        this.selectTile = null;
        let x = Input.mouse.getMouseX();
        let y = Input.mouse.getMouseY();
        this.width = this.tileImage.getWidth();
        this.height = this.tileImage.getHeight();
        // check layer
        if (x < this.clipX || this.clipX + this.clipWidth < x || y < this.clipY || this.clipY + this.clipHeight < y) {
            return;
        }
        x -= this.x;
        y -= this.y;
        for (const id in this.tileInfo) {
            if (this.tileInfo.hasOwnProperty(id)) {
                const tile = this.tileInfo[id];
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
        this.tileImage.render(ctx, this.x, this.y);
        if (this.selectTile !== null) {
            ctx.strokeRect(this.selectTile.image.x + this.x, this.selectTile.image.y + this.y, this.selectTile.image.width, this.selectTile.image.height, `red`);
        }
        if (this.selectedTile !== null) {
            ctx.strokeRect(this.selectedTile.image.x + this.x, this.selectedTile.image.y + this.y, this.selectedTile.image.width, this.selectedTile.image.height, `white`);
        }
    }
}

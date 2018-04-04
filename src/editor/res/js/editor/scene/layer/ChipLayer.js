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
        super(-1);

        let tileInfos = {};
        let imageIDs = {};
        for (let it in tileInfo) {
            if (tileInfo.hasOwnProperty(it) && !isNaN(it)) {
                let fileName = ContextImage.it.getImagePath(tileInfo[it].file).split(`/`).slice(-1)[0];
                if (tileInfos[fileName] === undefined) {
                    tileInfos[fileName] = {};
                    imageIDs[fileName] = tileInfo[it].file;
                }
                tileInfos[fileName][it] = tileInfo[it];
            }
        }

        this.chipLayers = [];
        this.names = [];

        for (let it in tileInfos) {
            if (tileInfos.hasOwnProperty(it)) {
                this.names.push(it);
                this.chipLayers.push(new SingleChipLayer(tileInfos[it], imageIDs[it]));
            }
        }


        this.tabX = 0;
        this.tabY = -20;
        this.tabWidth = 70;
        this.tabHeight = 20;
        this.tabPadding = 10;

        this.selectedChipLayer = 0;
    }

    /**
     * Get json data for saving
     * @return {json} Json data for saving
     */
    getSaveData() {
        let data = {};
        data.tiles = [];
        for (let i = 0; i < this.chipLayers.length; ++i) {
            let tile = {};
            tile.file = this.names[i];
            tile.chips = this.chipLayers[i].getSaveData();
            data.tiles.push(tile);
        }
        return data;
    }

    /**
     * Set Selection layer position
     * @param {number} x Chip layer x position
     * @param {number} y Chip layer y position
     * @param {number} width Chip layer width
     * @param {number} height Chip layer height
     */
    setPosition(x, y, width, height) {
        super.setPosition(x, y, width, height);
        this.chipLayers[this.selectedChipLayer].setPosition(x, y, width, height);
    }

    /**
     * Get selected tile ID
     * @override
     * @return {number} Selected tile ID (return -1 if not selected)
     */
    getSelected() {
        return this.chipLayers[this.selectedChipLayer].getSelected();
    }

    /**
     * Set selected tile by ID
     * @override
     * @param {number} id Tile ID
     */
    setSelected(id) {
        for (let i = 0; i < this.chipLayers.length; ++i) {
            this.chipLayers[i].setSelected(id);
            if (this.chipLayers[i].getSelected() != -1) {
                this.selectedChipLayer = i;
            }
        }
    }

    /**
     * Get selection image width
     * @override
     * @return {number} Selection image width
     */
    getImageWidth() {
        return this.chipLayers[this.selectedChipLayer].getImageWidth();
    }

    /**
     * Get selection image height
     * @override
     * @return {number} Selection image height
     */
    getImageHeight() {
        return this.chipLayers[this.selectedChipLayer].getImageHeight();
    }

    /**
     * Update layer
     * @override
     * @param {number} dt - delta time
     */
    update(dt) {
        super.update(dt);
        for (let it of this.chipLayers) {
            it.clipX = this.clipX;
            it.clipY = this.clipY;
        }
        // switch tab
        let x = Input.it.getMouseX() - this.x;
        let y = Input.it.getMouseY() - this.y;
        if (Input.it.isMousePress(Input.it.M.LEFT)) {
            for (let i = 0; i < this.chipLayers.length; ++i) {
                let sx = this.x + this.tabX + (this.tabWidth + this.tabPadding) * i;
                if (sx < x && x < sx + this.tabWidth && this.tabY < y && y < this.tabY + this.tabHeight) {
                    this.selectedChipLayer = i;
                    return;
                }
            }
        }
        // save currently id
        this.chipLayers[this.selectedChipLayer].update(dt);
    }

    /**
     * Render layer
     * @override
     * @param {Context} ctx
     */
    render(ctx) {
        ctx.fillRect(this.x, this.y, this.width, this.height, `green`);
        for (let i = 0; i < this.chipLayers.length; ++i) {
            ctx.fillRect(this.x + this.tabX + (this.tabWidth + this.tabPadding) * i, this.y + this.tabY, 70, 15, `white`);
            ctx.fillText(`${this.names[i]}`, this.x + this.tabX + (this.tabWidth + this.tabPadding) * (i + 0.4), this.y + this.tabY + this.tabHeight / 2.7, 0.5, 0.5, 12, `black`);
        }
        super.render(ctx);
        this.chipLayers[this.selectedChipLayer].render(ctx);
    }
}

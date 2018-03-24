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
     * @param {number} tileID Chip tile image ID
     */
    constructor(tileID) {
        super();
        /**
         * Chip tile image ID
         * @protected
         * @type {number}
         */
        this.tileID = tileID;


        /**
         * Chip tile x position
         * @protected
         * @type {number}
         */
        this.x = 0;
        /**
         * Chip tile y position
         * @protected
         * @type {number}
         */
        this.y = 0;
        /**
         * Selection rectangle x position
         * @protected
         * @type {number}
         */
        this.selectX = -1;
        /**
         * Selection rectangle x position
         * @protected
         * @type {number}
         */
        this.selectY = -1;

        /**
         * Selected chip x position
         * @protected
         * @type {number}
         */
        this.selectedX = -1;
        /**
         * Selected chip y position
         * @protected
         * @type {number}
         */
        this.selectedY = -1;

        /**
         * Selected tile id
         * @protected
         * @type {number}
         */
        this.selectedTile = -1;
    }

    /**
     * Set chip tile position
     * @param {number} x Chip tile x position
     * @param {number} y Chip tile y position
     */
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Get selected tile ID
     * @return {number} Selected tile ID
     */
    getSelectedTile() {
        return this.selectedTile;
    }

    /**
     * Update layer
     * @override
     * @param {number} dt - delta time
     */
    update(dt) {
        this.selectX = -1;
        this.selectY = -1;
        if (this.x <= Input.it.getMouseX() && this.y <= Input.it.getMouseY()) {
            this.selectX = Math.floor((Input.it.getMouseX() - this.x) / 32) * 32 + this.x;
            this.selectY = Math.floor((Input.it.getMouseY() - this.y) / 32) * 32 + this.y;
            if (Input.it.isMousePress(Input.it.M.LEFT)) {
                this.selectedX = Math.floor((this.selectX - this.x) / 32);
                this.selectedY = Math.floor((this.selectY - this.y) / 32);
                this.selectedTile = this.selectedX + this.selectedY * 6;
            }
        }
    }

    /**
     * Render layer
     * @override
     * @param {Context} ctx
     */
    render(ctx) {
        ctx.drawImage(this.tileID, this.x, this.y);
        if (this.selectX != -1) {
            ctx.strokeRect(this.selectX, this.selectY, 32, 32, `red`);
        }
    }
}

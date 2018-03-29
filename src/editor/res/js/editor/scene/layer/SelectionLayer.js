/**
 * Selection layer
 * Selects something
 * @implements {Layer}
 * @implements {Selection}
 * @classdesc Selection layer to select something
 */
class SelectionLayer extends Layer /* , Selection */ { // eslint-disable-line  no-unused-vars
    /**
     * Selection layer constructor
     * @constructor
     * @param {number} [imageID=-1] Selection image ID
     */
    constructor(imageID = -1) {
        super();
        /**
         * Selection image ID
         * @protected
         * @type {number}
         */
        this.imageID = imageID;
        /**
         * Selection layer x position
         * @protected
         * @type {number}
         */
        this.x = 0;
        /**
         * Selection layer y position
         * @protected
         * @type {number}
         */
        this.y = 0;
        /**
         * Selection layer width
         * @protected
         * @type {number}
         */
        this.width = 0;
        /**
         * Selection layer height
         * @protected
         * @type {number}
         */
        this.height = 0;
    }

    /**
     * Set Selection layer position
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
     * Get selected ID
     * @interface
     * @return {number} Selected ID (return -1 if not selected)
     */
    getSelected() {}

    /**
     * Set selected by ID
     * @interface
     * @param {number} id Selected ID
     */
    setSelected(id) {}

    /**
     * Render layer
     * @override
     * @param {Context} ctx
     */
    render(ctx) {
        ctx.fillRect(this.x, this.y, this.width, this.height, `green`);
        if (this.imageID >= 0) {
            ctx.drawImage(this.imageID, this.x, this.y);
        }
    }
}

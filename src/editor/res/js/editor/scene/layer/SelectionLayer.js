/**
 * Selection layer
 * - Performs drawing processing collectively
 * - ### Selects something
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

        /**
         * Clipping x position
         * @protected
         * @type {number}
         */
        this.clipX = 0;
        /**
         * Clipping y position
         * @protected
         * @type {number}
         */
        this.clipY = 0;

        /**
         * Currently mouse x position
         * @protected
         * @type {number}
         */
        this.oldMouseX = 0;
        /**
         * Currently mouse y position
         * @protected
         * @type {number}
         */
        this.oldMouseY = 0;
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
     * Get selection image width
     * @return {number} Selection image width
     */
    getImageWidth() {
        return ResourceManager.image.getWidth(this.imageID);
    }

    /**
     * Get selection image height
     * @return {number} Selection image height
     */
    getImageHeight() {
        return ResourceManager.image.getHeight(this.imageID);
    }

    /**
     * Update layer
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        let x = Input.mouse.getMouseX();
        let y = Input.mouse.getMouseY();
        if (this.x <= x && x < this.x + this.width && this.y <= y && y < this.y + this.height && Input.it.isPressed(Input.mouse.mRight())) {
            // block
            Input.it.blockInput(Input.mouse.mRight());
            // get width and height
            let width = this.getImageWidth();
            let height = this.getImageHeight();
            if (this.width < width || this.height < height) {
                if (this.oldMouseX != 0 || this.oldMouseY != 0) {
                    if (this.width < width) {
                        this.clipX -= x - this.oldMouseX;
                        if (this.clipX < 0) {
                            this.clipX = 0;
                        } else if (this.clipX > width - this.width) {
                            this.clipX = width - this.width;
                        }
                    }
                    if (this.height < height) {
                        this.clipY -= y - this.oldMouseY;
                        if (this.clipY < 0) {
                            this.clipY = 0;
                        } else if (this.clipY > height - this.height) {
                            this.clipY = height - this.height;
                        }
                    }
                }
                this.oldMouseX = x;
                this.oldMouseY = y;
                return;
            }
        }
        this.oldMouseX = 0;
        this.oldMouseY = 0;
    }

    /**
     * Render layer
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        if (this.imageID >= 0) {
            let width = ResourceManager.image.getWidth(this.imageID);
            let height = ResourceManager.image.getHeight(this.imageID);
            if (this.width < width || this.height < height) {
                ctx.drawImage(this.imageID, this.x, this.y, this.width < width ? this.width : width, this.height < height ? this.height : height, this.clipX, this.clipY, this.width < width ? this.width : width, this.height < height ? this.height : height);
            } else {
                ctx.drawImage(this.imageID, this.x, this.y);
            }
        }
    }
}

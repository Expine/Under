/**
 * Entity layer
 * - Performs drawing processing collectively
 * - Selects something and set selected
 * - Selects something
 * - ### Selects entities
 * @implements {SelectionLayer}
 * @classdesc Entity layer to select entities
 */
class EntityLayer extends SelectionLayer { // eslint-disable-line  no-unused-vars
    /**
     * Entity layer constructor
     * @constructor
     * @param {Object<number, JSON>} entityInfo Entity inforamtion json data
     */
    constructor(entityInfo) {
        super(-1);
        /**
         * Entity layers
         * @protected
         * @type {Array<SingleEntityLayer>}
         */
        this.entityLayers = [];
        for (let it in entityInfo) {
            if (entityInfo.hasOwnProperty(it) && !isNaN(it)) {
                this.entityLayers.push(new SingleEntityLayer(entityInfo[it]));
            }
        }
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
        let sx = x;
        let sy = y;
        let maxHeight = 0;
        for (let it of this.entityLayers) {
            it.setPosition(sx, sy, 0, 0);
            sx += it.width;
            maxHeight = Math.max(maxHeight, it.height);
            if (sx > x + width) {
                sx = x;
                sy += maxHeight;
                maxHeight = 0;
            }
        }
    }

    /**
     * Get selected entity ID
     * @override
     * @return {number} Selected entity ID (return -1 if not selected)
     */
    getSelected() {
        for (let it of this.entityLayers) {
            let selected = it.getSelected();
            if (selected >= 0) {
                return selected;
            }
        }
        return -1;
    }

    /**
     * Set selected entity by ID
     * @override
     * @param {number} id Entity ID
     */
    setSelected(id) {
        for (let i = 0; i < this.entityLayers.length; ++i) {
            this.entityLayers[i].setSelected(-1);
            if (i != id) {
                continue;
            }
            this.entityLayers[i].setSelected(id);
        }
    }

    /**
     * Get selection image width
     * @override
     * @return {number} Selection image width
     */
    getImageWidth() {
        let width = 0;
        for (let it of this.entityLayers) {
            width = Math.max(width, it.x + it.width);
        }
        return width - this.x;
    }

    /**
     * Get selection image height
     * @override
     * @return {number} Selection image height
     */
    getImageHeight() {
        let height = 0;
        for (let it of this.entityLayers) {
            height = Math.max(height, it.y + it.height);
        }
        return height - this.y;
    }


    /**
     * Update layer
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        super.update(dt);
        for (let it of this.entityLayers) {
            it.clipX = this.clipX;
            it.clipY = this.clipY;
        }
        // save currently id
        let id = this.getSelected();
        let maxID = -1;
        for (let it of this.entityLayers) {
            it.update(dt);
            maxID = Math.max(it.getSelected(), maxID);
        }
        // if they are all uncheck and one of them currently is selected
        if (maxID == -1 && id >= 0) {
            if (Input.mouse.isPress(Input.mouse.mLeft())) {
                let x = Input.mouse.getMouseX() - this.x;
                let y = Input.mouse.getMouseY() - this.y;
                // check if it is outside the layer
                if (0 > x || x >= this.width || 0 > y || y >= this.height) {
                    this.setSelected(id);
                }
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
        for (let it of this.entityLayers) {
            it.render(ctx);
        }
    }
}

/**
 * Entity layer
 * - Performs drawing processing collectively
 * - Clips area when rendering
 * - Selects something and set selected
 * - It can save data
 * - Selects something
 * - ### Selects entities
 * @extends {SelectionLayer}
 * @classdesc Entity layer to select entities
 */
class EntityLayer extends SelectionLayer { // eslint-disable-line  no-unused-vars
    /**
     * Entity layer constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Entity information json data
         * @protected
         * @type {Object<number, JSON>}
         */
        this.entityInfo = null;

        /**
         * Entity layers
         * @protected
         * @type {Array<SelectionLayer>}
         */
        this.entityLayers = [];
    }

    /**
     * Set information for selection
     * @override
     * @param {JSON} info Selection information
     */
    setSelectionInfo(info) {
        this.entityInfo = {};
        for (let it in info) {
            if (info.hasOwnProperty(it) && !isNaN(it)) {
                this.entityInfo[it] = info[it];
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
        for (let it of this.entityLayers) {
            it.setSelected(id);
        }
    }

    /**
     * Initialize layer
     * @override
     */
    init() {
        for (let it in this.entityInfo) {
            if (this.entityInfo.hasOwnProperty(it)) {
                let layer = new SingleEntityLayer();
                layer.setSelectionInfo(this.entityInfo[it]);
                layer.init();
                this.entityLayers.push(layer);
            }
        }
        this.entityLayers = this.entityLayers.sort((a, b) => a.height < b.height ? -1 : a.height > b.height ? 1 : 0);
    }

    /**
     * Update layer
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        // set entity layer position
        let sx = this.x;
        let sy = this.y;
        let maxHeight = 0;
        let innerHeight = 0;
        for (let it of this.entityLayers) {
            if (it.height != maxHeight || sx + it.width > this.x + this.width) {
                sx = this.x;
                sy += maxHeight;
                innerHeight += maxHeight;
                maxHeight = 0;
            }
            it.setPosition(sx, sy);
            sx += it.width;
            maxHeight = Math.max(maxHeight, it.height);
        }
        this.height = innerHeight + maxHeight;
        // cliping
        for (let it of this.entityLayers) {
            it.clip(this.clipX, this.clipY, this.clipWidth, this.clipHeight);
        }

        // update
        for (let it of this.entityLayers) {
            it.update(dt);
        }
    }

    /**
     * Render layer
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        ctx.fillRect(this.clipX, this.clipY, this.clipWidth, this.clipHeight, `green`);
        for (let it of this.entityLayers) {
            it.render(ctx);
        }
    }
}

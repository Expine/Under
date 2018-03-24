/**
 * Scene of editor
 * To make stage
 * @extends {LayerBaseScene}
 * @classdesc scene of making stage
 */
class EditorScene extends LayerBaseScene { // eslint-disable-line  no-unused-vars
    /**
     * Initialize scene
     * @override
     */
    init() {
        /**
         * Stage instance
         * @protected
         * @type {Stage}
         */
        this.stage = (new EditorStageParser()).parse(`res/stage/map1.json`, Screen.it.width, Screen.it.height - 250);

        /**
         * Chip layer
         * @protected
         * @type {ChipLayer}
         */
        this.chipLayer = new ChipLayer(ContextImage.it.loadImage(`res/image/tile/tile.png`));
        this.layers.push(this.chipLayer);
    }


    /**
     * Update scene
     * @override
     * @param {number} dt - delta time
     */
    update(dt) {
        this.chipLayer.setPosition(20, Screen.it.height - 230);
        this.stage.update(dt);
        super.update(dt);
        //        let id = this.chipLayer.getSelectedTile();
    }

    /**
     * Render scene
     * @override
     * @param {Context} ctx
     */
    render(ctx) {
        this.stage.render(ctx);
        super.render(ctx);
    }
}

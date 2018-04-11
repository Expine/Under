/**
 * Editor scene
 * - Controls updating and rendering
 * - Basic form of a scene composed of layers
 * - ### Makes stage
 * @extends {LayerBaseScene}
 * @classdesc Editor scene to make stage
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
         * @type {EditorStage}
         */
        this.stage = (new EditorStageParser()).parse(`src/res/stage/world1.json`, Screen.it.width, Screen.it.height - 250);

        /**
         * Chip layer
         * @protected
         * @type {SelectionLayer}
         */
        this.chipLayer = new ChipLayer(this.stage.getTileInfo());
        /**
         * Entity layer
         * @protected
         * @type {SelectionLayer}
         */
        this.entityLayer = new EntityLayer(this.stage.getEntityInfo());

        this.layers.push(this.chipLayer);
        this.layers.push(this.entityLayer);
        this.layers.push(new DebugLayer(this.stage));
        this.stage.setTileSelection(this.chipLayer);
        this.stage.setEntitySelection(this.entityLayer);
    }


    /**
     * Update scene
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        // set position and size
        this.chipLayer.setPosition(20, Screen.it.height - 230, Screen.it.width / 2 - 40, 210);
        this.entityLayer.setPosition(Screen.it.width / 2 + 20, Screen.it.height - 230, Screen.it.width / 2 - 40, 210);

        // update
        super.update(dt);
        this.stage.update(dt);

        // save
        if (Input.it.isKeyPress(Input.it.A + 18)) {
            this.stage.getSaveData();
            console.log(this.stage.saveData);
        }
        if (Input.it.isKeyPress(Input.it.A + 19)) {
            console.log(JSON.stringify(this.chipLayer.getSaveData()));
        }
        // change debug mode
        if (Input.it.isKeyPress(Input.it.A + 3)) {
            Engine.debug = !Engine.debug;
        }

        // change debug mode
        if (Input.it.isKeyPress(Input.it.A + 6)) {
            ResourceManager.image.reload();
        }
    }

    /**
     * Render scene
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        this.stage.render(ctx);
        ctx.fillRect(0, Screen.it.height - 250, Screen.it.width, 250, `blue`);
        super.render(ctx);
    }
}

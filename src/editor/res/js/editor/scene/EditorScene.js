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
        this.stage = (new EditorStageParser()).parse(`src/res/stage/map1.json`, GameScreen.it.width, GameScreen.it.height - 250);
        this.stage.init();

        /**
         * Event manager
         * @protected
         * @type {EventManager}
         */
        this.eventManager = new QueueEventManager();

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

        this.addLayer(this.chipLayer);
        this.addLayer(this.entityLayer);
        this.addLayer(new DebugLayer(this.stage));
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
        this.chipLayer.setPosition(20, GameScreen.it.height - 230, GameScreen.it.width / 2 - 40, 210);
        this.entityLayer.setPosition(GameScreen.it.width / 2 + 20, GameScreen.it.height - 230, GameScreen.it.width / 2 - 40, 210);

        // update
        super.update(dt);
        this.stage.update(dt);

        // update event
        this.eventManager.update(dt);

        // save
        if (Input.key.isPress(Input.key.a() + 18)) {
            this.stage.getSaveData();
            console.log(this.stage.saveData);
        }
        if (Input.key.isPress(Input.key.a() + 19)) {
            console.log(JSON.stringify(this.chipLayer.getSaveData()));
        }
        // change debug mode
        if (Input.key.isPress(Input.key.a() + 3)) {
            Engine.debug = !Engine.debug;
        }

        // change debug mode
        if (Input.key.isPress(Input.key.a() + 6)) {
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
        this.eventManager.render(ctx);
        ctx.fillRect(0, GameScreen.it.height - 250, GameScreen.it.width, 250, `blue`);
        super.render(ctx);
    }
}

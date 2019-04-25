/**
 * Editor scene
 * - Controls updating and rendering
 * - It consists of layers
 * - Basic form of a scene composed of layers
 * - ### Makes stage
 * @extends {BaseLayeredScene}
 * @classdesc Editor scene to make stage
 */
class EditorScene extends BaseLayeredScene {
    /**
     * Editor scene constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Stage instance
         * @protected
         * @type {StageManager}
         */
        this.stageManager = null;
        /**
         * Event manager
         * @protected
         * @type {EventManager}
         */
        this.eventManager = null;

        /**
         * Chip save data
         * @protected
         * @type {IEditorSave}
         */
        this.chipData = null;
        /**
         * Entity save data
         * @protected
         * @type {IEditorSave}
         */
        this.entityData = null;

        /**
         * Save target
         * @protected
         * @type {IEditorSave}
         */
        this.saveTarget = null;
    }
    /**
     * Initialize scene
     * @override
     */
    init() {
        // set stage manager
        const manager = new EditorStageManager();
        manager.setStageParser(new EditorStageParser());
        manager.setStageSize(GameScreen.it.getWidth(), GameScreen.it.getHeight() - 250);
        manager.pushStage(`map1`);
        this.stageManager = manager;
        this.saveTarget = manager;

        // make event manager
        this.eventManager = new QueueEventManager();

        // make layer
        const chipLayer = new ChipLayer();
        const entityLayer = new EntityLayer();
        const debug = new DebugLayer(new VolatileDebugger());
        // set save data
        this.chipData = chipLayer;
        this.entityData = entityLayer;

        // make real layer
        const chip = new FloatLayer(chipLayer);
        const entity = new FloatLayer(new DragScrollLayer(entityLayer));

        // set information
        const stage = this.stageManager.getStage();
        if (BaseUtil.implementsOf(stage, IEditable)) {
            stage.setTileSelection(chipLayer);
            stage.setEntitySelection(entityLayer);
        }

        this.addLayer(chip);
        this.addLayer(entity);
        this.addLayer(debug);

        debug.setSize(GameScreen.it.getWidth(), GameScreen.it.getHeight() - 250);
        chip.setPosition(20, GameScreen.it.getHeight() - 230, 0);
        chip.setSize(GameScreen.it.getWidth() / 2 - 40, 210);
        entity.setPosition(GameScreen.it.getWidth() / 2 + 20, GameScreen.it.getHeight() - 230, 0);
        entity.setSize(GameScreen.it.getWidth() / 2 - 40, 210);
        chipLayer.setPosition(20, GameScreen.it.getHeight() - 230, 0);
        chipLayer.setSize(GameScreen.it.getWidth() / 2 - 40, 210);
        entityLayer.setPosition(GameScreen.it.getWidth() / 2 + 20, GameScreen.it.getHeight() - 230, 0);
        entityLayer.setSize(GameScreen.it.getWidth() / 2 - 40, 210);
    }


    /**
     * Update scene
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        // update
        super.update(dt);

        // update stage
        this.stageManager.update(dt);
        // update event
        this.eventManager.update(dt);

        // save stage (S)
        if (Input.key.isPress(Input.key.a() + 18)) {
            console.log(JSON.stringify(this.saveTarget.getSaveData()));
        }
        // save tile (T)
        if (Input.key.isPress(Input.key.a() + 19)) {
            console.log(JSON.stringify(this.chipData.getSaveData()));
        }
        // save entity (U)
        if (Input.key.isPress(Input.key.a() + 20)) {
            console.log(JSON.stringify(this.entityData.getSaveData()));
        }
        // change debug mode (D)
        if (Input.key.isPress(Input.key.a() + 3)) {
            GameDebugger.debug = !GameDebugger.debug;
        }

        // reload images (G)
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
        this.stageManager.render(ctx);
        this.eventManager.render(ctx);
        ctx.fillRect(0, GameScreen.it.getHeight() - 250, GameScreen.it.getWidth(), 250, `blue`);
        super.render(ctx);
    }
}

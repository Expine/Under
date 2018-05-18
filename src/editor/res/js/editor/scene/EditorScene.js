/**
 * Editor scene
 * - Controls updating and rendering
 * - It consists of layers
 * - Basic form of a scene composed of layers
 * - ### Makes stage
 * @extends {BaseLayeredScene}
 * @classdesc Editor scene to make stage
 */
class EditorScene extends BaseLayeredScene { // eslint-disable-line  no-unused-vars
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
        let manager = new EditorStageManager();
        manager.setStageParser(new EditorStageParser());
        manager.setStageSize(GameScreen.it.width, GameScreen.it.height - 250);
        manager.pushStage(`map1`);
        this.stageManager = manager;
        this.saveTarget = manager;

        // make event manager
        this.eventManager = new QueueEventManager();

        // make layer
        let chipLayer = new ChipLayer();
        let entityLayer = new EntityLayer();
        let debug = new DebugLayer(new VolatileDebugger());
        this.chipData = chipLayer;
        this.entityData = entityLayer;

        let chip = new FloatLayer(chipLayer);
        let entity = new FloatLayer(new DragScrollLayer(entityLayer));
        // TODO: Should abstract
        this.stageManager.getStage().setTileSelection(chipLayer);
        this.stageManager.getStage().setEntitySelection(entityLayer);

        this.addLayer(chip);
        this.addLayer(entity);
        this.addLayer(debug);

        // set initiali position
        debug.setSize(GameScreen.it.width, GameScreen.it.height);
        chip.setPosition(20, GameScreen.it.height - 230, 0);
        chip.setSize(GameScreen.it.width / 2 - 40, 210);
        entity.setPosition(GameScreen.it.width / 2 + 20, GameScreen.it.height - 230, 0);
        entity.setSize(GameScreen.it.width / 2 - 40, 210);
        chipLayer.setPosition(20, GameScreen.it.height - 230, 0);
        chipLayer.setSize(GameScreen.it.width / 2 - 40, 210);
        entityLayer.setPosition(GameScreen.it.width / 2 + 20, GameScreen.it.height - 230, 0);
        entityLayer.setSize(GameScreen.it.width / 2 - 40, 210);
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

        let stage = this.stageManager.getStage();
        let players = stage.getEntities().filter((it) => BaseUtil.implementsOf(it, IPlayable));
        if (players.length > 0) {
            let player = players[0];
            Debugger.it.register(`time`, `${dt} mssc`);
            Debugger.it.register(`collision`, `${stage.getPhysicalWorld().getCollisionSize()} collision`);
            if (player instanceof InfluentialEntity) {
                Debugger.it.register(`pcollision`, `${player.collider.collisions.length} player collision`);
            }
            Debugger.it.register(`physics`, `${BaseUtil.getClassName(stage.getPhysicalWorld() instanceof DebugWorld ? stage.getPhysicalWorld().world : stage.getPhysicalWorld())}-${BaseUtil.getClassName(stage.getPhysicalWorld().getResponse())}`);
            Debugger.it.register(`ppos`, `Pos(${Math.floor(player.x)}, ${Math.floor(player.y)})`);
            if (player instanceof MutableEntity) {
                Debugger.it.register(`pvec`, `Vec(${Math.floor(player.body.velocityX)}, ${Math.floor(player.body.velocityY)})`);
                Debugger.it.register(`pacc`, `Acc(${Math.floor(player.body.accelerationX)},${Math.floor(player.body.accelerationY)})`);
            }
            if (player instanceof StateCharacter && player.state !== null) {
                Debugger.it.register(`state`, `${BaseUtil.getClassName(player.state)}`);
            }
            Debugger.it.register(`mouse`, `M(${Math.floor(Input.mouse.getMouseX())},${Math.floor(Input.mouse.getMouseY())})`);
        }

        // save
        if (Input.key.isPress(Input.key.a() + 18)) {
            console.log(JSON.stringify(this.saveTarget.getSaveData()));
        }
        if (Input.key.isPress(Input.key.a() + 19)) {
            console.log(JSON.stringify(this.chipData.getSaveData()));
        }
        // change debug mode
        if (Input.key.isPress(Input.key.a() + 3)) {
            Debugger.debug = !Debugger.debug;
        }

        // reload images
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
        ctx.fillRect(0, GameScreen.it.height - 250, GameScreen.it.width, 250, `blue`);
        super.render(ctx);
    }
}

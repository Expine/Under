import { BaseLayeredScene } from "../../under/extend/scene/BaseLayeredScene";

/**
 * Game Scene
 * - Render stage and control gameover
 * @extends {BaseLayeredScene}
 * @classdesc Game scene to render stage and control gameover
 */
export class GameScene extends BaseLayeredScene {
    /**
     * Game stage manager
     * @protected
     * @type {StageManager}
     */
    protected stageManager: StageManager = null;
    /**
     * Current stage instance
     * @protected
     * @type {Stage}
     */
    protected currentStage: Stage = null;

    /**
     * Event manager
     * @protected
     * @type {EventManager}
     */
    protected eventManager: EventManager = null;

    /**
     * Game player
     * @protected
     * @type {IPlayable}
     */
    protected player: IPlayable = null;

    /**
     * Whether the game is over
     * @protected
     * @type {boolean}
     */
    protected gameover: boolean = false;

    /**
     * Game scene
     */
    constructor() {
        super();

        this.stageManager = null;
        this.currentStage = null;
        this.eventManager = null;
        this.player = null;
        this.gameover = false;
    }

    /**
     * Initialize stage of game
     * @protected
     */
    initStage() {
        this.gameover = false;
        // set player
        this.currentStage = this.stageManager.getStage();
        this.player = this.stageManager.getStage().getEntitiesByInterface(IPlayable).find((it) => !it.isGameover());

        // initialize ui layer
        const layers = this.getLayers();
        for (let i = layers.length - 1; i >= 0; --i) {
            this.removeLayer(layers[i]);
        }
        const ui = new UILayer(this.stageManager);
        ui.setPosition(0, 0);
        ui.setSize(GameScreen.it.width, GameScreen.it.height);
        this.addLayer(ui);
    }

    /**
     * Initialize scene
     * @override
     */
    init() {
        this.stageManager = new StackStageManager();
        this.stageManager.setStageParser(new UnderStageParser());
        this.stageManager.setStageSize(GameScreen.it.width, GameScreen.it.height);
        this.stageManager.pushStage(`map1`);

        const eventImage = new SingleAnimation(true);
        const id = ResourceManager.image.load(`event/eventBack.png`);
        for (let i = 0; i < 4; ++i) {
            eventImage.addAnimation(new TileImage(id, GameScreen.it.width, GameScreen.it.height, i * 100, 0, 100, 75), 250);
        }
        this.eventManager = new WithBackgroundEventManager(eventImage);
        this.eventManager.init();

        // initialize stage
        this.initStage();
    }

    /**
     * Update scene
     * @override
     * @param {number} dt Delta time
     */
    update(dt: number) {
        // gameover
        if (this.player.isGameover() && !this.gameover) {
            const layer = new GameoverLayer();
            layer.setPosition(0, 0, 1);
            layer.setSize(GameScreen.it.width, GameScreen.it.height);
            this.addLayer(layer);
            this.gameover = true;
        }

        this.stageManager.update(dt);
        super.update(dt);
        // judge game over
        if (this.gameover) {
            // retry
            if (Input.key.isPress(Input.key.yes())) {
                // check respawn
                for (const it of this.stageManager.getStage().getEntitiesByInterface(RespawnEntity)) {
                    const entity = it.tryRespawn(dt);
                    if (BaseUtil.implementsOf(entity, IPlayable)) {
                        this.initStage();
                    } else {
                        this.stageManager.getStage().removeEntityImmediately(entity);
                    }
                }
            } else if (Input.key.isPress(Input.key.no())) {
                SceneManager.it.replaceScene(new TitleScene());
            }
        }
        // check transtion of stage
        if (this.stageManager.getStage() !== this.currentStage) {
            this.currentStage = this.stageManager.getStage();
            this.player = this.stageManager.getStage().getEntitiesByInterface(IPlayable).find((it) => !it.isGameover());
        }

        // update event
        this.eventManager.update(dt);
    }

    /**
     * Render scene
     * @override
     * @param {Context} ctx
     */
    render(ctx: Context) {
        this.stageManager.render(ctx);
        super.render(ctx);
        this.eventManager.render(ctx);
    }
}

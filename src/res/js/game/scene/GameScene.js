/**
 * Game Scene
 * - Controls updating and rendering
 * - It consists of layers
 * - Basic form of a scene composed of layers
 * - ### Render stage and control gameover
 * @extends {BaseLayeredScene}
 * @classdesc Game scene to render stage and control gameover
 */
class GameScene extends BaseLayeredScene { // eslint-disable-line  no-unused-vars
    /**
     * Game scene
     */
    constructor() {
        super();

        /**
         * Game stage manager
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
         * Game player
         * @protected
         * @type {IPlayable}
         */
        this.player = null;

        /**
         * Whether the game is over
         * @protected
         * @type {boolean}
         */
        this.gameover = false;
    }

    /**
     * Initialize scene
     * @override
     */
    init() {
        this.stageManager = new StackStageManager();
        this.stageManager.setStageParser(new UnderStageParser());
        this.stageManager.pushStage(`map1`);

        this.eventManager = new QueueEventManager();

        // set player
        this.player = this.stageManager.getStage().getEntities().find((it) => BaseUtil.implementsOf(it, IPlayable));

        // initialize layer
        this.layers.length = 0;
        this.addLayer(new UILayer(this.stageManager.getStage()));
        this.gameover = false;
    }

    /**
     * Update scene
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        // gameover
        if (this.player.isGameover() && !this.gameover) {
            this.addLayer(new GameoverLayer());
            this.gameover = true;
        }

        this.stageManager.update(dt);
        super.update(dt);
        if (this.gameover) {
            // retry
            if (Input.key.isPress(Input.key.yes())) {
                this.init();
            } else if (Input.key.isPress(Input.key.no())) {
                SceneManager.it.replaceScene(new TitleScene());
            }
        }

        // update event
        this.eventManager.update(dt);
    }

    /**
     * Render scene
     * @override
     * @param {Context} ctx
     */
    render(ctx) {
        this.stageManager.render(ctx);
        super.render(ctx);
        this.eventManager.render(ctx);
    }
}

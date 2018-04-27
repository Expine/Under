/**
 * Game Scene
 * - Controls updating and rendering
 * - Basic form of a scene composed of layers
 * - ### Render stage and control gameover
 * @extends {LayerBaseScene}
 * @classdesc Game scene to render stage and control gameover
 */
class GameScene extends LayerBaseScene { // eslint-disable-line  no-unused-vars
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
         * Game player
         * @protected
         * @type {Player}
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
        this.stageManager.pushStage(`recruit`);

        // set player
        this.player = this.stageManager.getStage().getEntities().filter((it) => it instanceof Player)[0];

        // initialize layer
        this.layers.length = 0;
        this.layers.push(new UILayer(this.player));
    }

    /**
     * Update scene
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        // gameover
        if (this.player.getHP() <= 0 && !this.gameover) {
            this.layers.push(new GameoverLayer());
            this.gameover = true;
        }

        this.stageManager.update(dt);
        super.update(dt);
        if (this.gameover) {
            // retry
            if (Input.it.isPress(Input.key.yes())) {
                this.init();
            } else if (Input.it.isPress(Input.key.no())) {
                SceneManager.it.replaceScene(new TitleScene());
            }
        }

        // update event
        EventManager.exec.update(dt);
    }

    /**
     * Render scene
     * @override
     * @param {Context} ctx
     */
    render(ctx) {
        this.stageManager.render(ctx);
        super.render(ctx);
        EventManager.exec.render(ctx);
    }
}

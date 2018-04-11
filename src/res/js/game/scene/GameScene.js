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
     * Initialize scene
     * @override
     */
    init() {
        /**
         * Game stage
         * @protected
         * @type {Stage}
         */
        this.stage = (new UnderStageParser().parse(`src/res/stage/map1.json`, Screen.it.width, Screen.it.height));

        /**
         * Game player
         * @protected
         * @type {Player}
         */
        this.player = this.stage.getEntities().filter((it) => it instanceof Player)[0];

        /**
         * Whether the game is over
         * @protected
         * @type {bool}
         */
        this.gameover = false;

        // initialize layer
        this.layers.length = 0;
        this.layers.push(new DebugLayer(this.stage));
        this.layers.push(new UILayer(this.player));
    }

    /**
     * Update scene
     * @override
     * @param {number} dt - delta time
     */
    update(dt) {
        // gameover
        if (this.player.getHP() <= 0 && !this.gameover) {
            this.layers.push(new GameoverLayer());
            this.gameover = true;
        }

        this.stage.update(dt);
        super.update(dt);
        if (this.gameover) {
            // retry
            if (Input.it.isPress(Input.key.yes())) {
                this.init();
            } else if (Input.it.isPress(Input.key.no())) {
                SceneManager.it.replaceScene(new TitleScene());
            }
        }
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

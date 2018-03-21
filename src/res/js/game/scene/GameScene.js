/**
 * Game Scene
 * @extends {LayerBaseScene}
 * @classdesc Game scene
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
        this.stage = (new UnderStageParser().parse(`res/stage/map1.json`, Screen.it.width, Screen.it.height));
        /**
         * Game player
         * @protected
         * @type {Player}
         */
        this.player = this.stage.getEntities().filter((it) => it instanceof Player)[0];

        // initialize layer
        this.layers.length = 0;
        this.layers.push(new DebugLayer(this.stage));
        this.layers.push(new UILayer(this.player));
        /**
         * Whether the game is over
         * @protected
         * @type {bool}
         */
        this.gameover = false;
    }

    /**
     * Update scene
     * @override
     * @param {number} dt - delta time
     */
    update(dt) {
        // gameover
        if (this.player.getHP() <= 0 && !this.gameover) {
            // TODO: Should make it a function
            this.player.addAI(new PlayerGameoverStateAI(`gameover`), 0);
            this.player.setCollider(new RoundRectangleCollider(0, 32, 64, 32, 5));
            this.layers.push(new GameoverLayer());
            this.gameover = true;
        }

        this.stage.update(dt);
        super.update(dt);
        if (this.gameover) {
            // retry
            if (Input.it.isYesPress()) {
                this.init();
            } else if (Input.it.isNoPress()) {
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

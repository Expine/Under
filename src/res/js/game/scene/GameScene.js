/**
 * Game Scene
 * @classdesc Game scene class
 */
class GameScene extends Scene { // eslint-disable-line  no-unused-vars
    /**
     * Initialize scene
     * @override
     */
    init() {
        // Music.it.playBGM(Music.it.loadMusic(`res/sound/test.mp3`));
        this.stage = (new JSONStageParser().parse(`res/stage/map1.json`, Screen.it.width, Screen.it.height));

        // this.stage = (new UnderStageParser()).parse(`res/stage/test.map`, Screen.it.width, Screen.it.height);
        let chara = ContextImage.it.loadImage(`res/image/chara/player.png`);
        this.player = new UnderPlayer(74, 200, 64, 64, chara);
        this.player.setRigidBody(new MaxAdoptBody());
        this.player.setCollider(new RoundRectangleCollider(12, 10, 38, 54, 10));
        this.player.setMaterial(new DefaultMaterial(1, 0.1, 0.95));
        this.player.addAI(new PlayerBaseStateAI());
        this.stage.addEntity(this.player);

        let en = ContextImage.it.loadImage(`res/image/chara/enemy.png`);
        for (var i = 0; i < 10; ++i) {
            let enemy = new Enemy(154 + 80 * (i % 20), 180 - 80 * Math.floor(i / 20), 64, 64, en);
            enemy.setRigidBody(new MaxAdoptBody());
            enemy.setCollider(new RoundRectangleCollider(0, 32, 64, 32, 5));
            enemy.setMaterial(new DefaultMaterial(1, 0.1, 0.95));
            enemy.addAI(new EnemyAI());
            this.stage.addEntity(enemy);
        }

        for (var i = 0; i < 0; ++i) {
            let bo = ContextImage.it.loadImage(`res/image/chara/box.png`);
            let box = new Obstacle(100 + 80 * (i % 20), 180 - 80 * Math.floor(i / 20), 64 / 2, 64 / 2, bo);
            box.setRigidBody(new MaxAdoptBody());
            box.setCollider(new RectangleCollider(0, 0, 64 / 2, 64 / 2));
            box.setMaterial(new DefaultMaterial(1, 0.1, 0.95));
            this.stage.addEntity(box);
        }

        this.debug = new DebugLayer(this.stage);
        this.ui = new UILayer(this.player);
        this.gameover = null;
    }

    /**
     * Update scene
     * @interface
     * @param {number} dt - delta time
     */
    update(dt) {
        // gameover
        if (this.player.getHP() <= 0 && this.gameover == null) {
            this.player.addAI(new BaseStateAI(new PGameoverState()), 0);
            this.player.setCollider(new RoundRectangleCollider(0, 32, 64, 32, 5));
            this.gameover = new GameoverLayer();
        }

        this.stage.update(dt);
        this.debug.update(dt);
        this.ui.update(dt);
        if (this.gameover != null) {
            this.gameover.update(dt);

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
     * @interface
     * @param {Context} ctx
     */
    render(ctx) {
        this.stage.render(ctx);
        this.debug.render(ctx);
        this.ui.render(ctx);
        if (this.gameover != null) {
            this.gameover.render(ctx);
        }
    }
}

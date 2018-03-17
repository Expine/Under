/**
 * Game Scene
 * @classdesc Game scene class
 */
class GameScene extends Scene { // eslint-disable-line  no-unused-vars
    /**
     * Start scene
     * @override
     */
    start() {
        // Music.it.playBGM(Music.it.loadMusic(`res/sound/test.mp3`));
        this.stage = (new JSONStageParser().parse(`res/stage/map1.json`, Screen.it.width, Screen.it.height));

        // this.stage = (new UnderStageParser()).parse(`res/stage/test.map`, Screen.it.width, Screen.it.height);
        let chara = Context.image.loadImage(`res/image/chara/player.png`);
        this.player = new UnderPlayer(74, 200, 64, 64, chara);
        this.player.setRigidBody(new NextSetterBody(this.player));
        // this.player.setCollider(new CircleCollider(this.player, 32));
        this.player.setCollider(new RoundRectangleCollider(this.player, 12, 10, 38, 54, 10));
        // this.player.setCollider(new RectangleCollider(this.player, 12, 10, 38, 54));
        // this.player.setCollider(new RectangleCollider(this.player, -12, 10, 200, 54));
        this.stage.addEntity(this.player);

        let en = Context.image.loadImage(`res/image/chara/enemy.png`);
        for (var i = 0; i < 0; ++i) {
            let enemy = new Enemy(154 + 80 * (i % 20), 180 - 80 * Math.floor(i / 20), 64, 64, en);
            enemy.setRigidBody(new NextSetterBody(enemy));
            enemy.setCollider(new RoundRectangleCollider(enemy, 0, 32, 64, 32, 5));
            // enemy.setCollider(new CircleCollider(enemy, 32));
            this.stage.addEntity(enemy);
        }

        for (var i = 0; i < 0; ++i) {
            let bo = Context.image.loadImage(`res/image/chara/box.png`);
            let box = new Obstacle(100 + 80 * (i % 20), 180 - 80 * Math.floor(i / 20), 64 / 2, 64 / 2, bo);
            box.setRigidBody(new NextSetterBody(box));
            // box.setCollider(new RoundRectangleCollider(box, 0, 0, 64 / 2, 64 / 2, 3));
            box.setCollider(new RectangleCollider(box, 0, 0, 64 / 2, 64 / 2));
            // box.setCollider(new CircleCollider(box, 32));
            this.stage.addEntity(box);
        }

        this.debug = new DebugLayer(this.stage);
        this.ui = new UILayer(this.player);
        this.gameover = null;
    }

    update(dt) {
        // gameover
        if (this.player.getHP() <= 0 && this.gameover == null) {
            this.player.addAI(new BaseStateAI(this.player, new PGameoverState()), 0);
            this.player.setCollider(new RoundRectangleCollider(this.player, 0, 32, 64, 32, 5));
            this.gameover = new GameoverLayer();
        }

        this.stage.update(dt);
        this.debug.update(dt);
        this.ui.update(dt);
        if (this.gameover != null) {
            this.gameover.update(dt);

            // retry
            if (Input.it.isYesPress()) {
                this.start();
            } else if (Input.it.isNoPress()) {
                this.scene.replaceScene(new TitleScene());
            }
        }
    }

    render(ctx) {
        this.stage.render(ctx);
        this.debug.render(ctx);
        this.ui.render(ctx);
        if (this.gameover != null) {
            this.gameover.render(ctx);
        }
    }
}

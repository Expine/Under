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
        this.stage = (new ConcreteStageParser()).parse(`res/stage/test.map`, Screen.it.width, Screen.it.height);
        let chara = Context.image.loadImage(`res/image/chara/player.png`);
        this.player = new Player(74, 200, 64, 64, chara);
        this.player.setRigidBody(new GravityElasticBody(this.player));
        // this.player.setCollider(new CircleCollider(this.player, 32));
        this.player.setCollider(new RoundRectangleCollider(this.player, 12, 10, 38, 54, 10));
        // this.player.setCollider(new RectangleCollider(this.player, 12, 10, 38, 54));
        // this.player.setCollider(new RectangleCollider(this.player, -12, 10, 200, 54));
        this.stage.addEntity(this.player);

        let en = Context.image.loadImage(`res/image/chara/enemy.png`);
        for (var i = 0; i < 10; ++i) {
            let enemy = new Enemy(154 + 80 * (i % 20), 180 - 80 * Math.floor(i / 20), 64, 64, en);
            enemy.setRigidBody(new GravityElasticBody(enemy));
            enemy.setCollider(new RoundRectangleCollider(enemy, 0, 32, 64, 32, 5));
            // enemy.setCollider(new CircleCollider(enemy, 32));
            this.stage.addEntity(enemy);
        }

        for (var i = 0; i < 0; ++i) {
            let bo = Context.image.loadImage(`res/image/chara/box.png`);
            let box = new Obstacle(100 + 80 * (i % 20), 180 - 80 * Math.floor(i / 20), 64 / 2, 64 / 2, bo);
            box.setRigidBody(new GravityElasticBody(box));
            // box.setCollider(new RoundRectangleCollider(box, 0, 0, 64 / 2, 64 / 2, 3));
            box.setCollider(new RectangleCollider(box, 0, 0, 64 / 2, 64 / 2));
            // box.setCollider(new CircleCollider(box, 32));
            this.stage.addEntity(box);
        }

        this.debug = new DebugLayer(this.stage);
    }

    update(dt) {
        if (Input.it.isKeyPressed(16)) {
            let ret = [];
            for (let it of this.stage.entities_) {
                if (it instanceof Obstacle) {
                    it.setCollider(undefined);
                    continue;
                }
                ret.push(it);
            }
            this.stage.entities_ = ret;
        }

        this.stage.update(dt);
        this.debug.update(dt);
    }

    render(ctx) {
        this.stage.render(ctx);
        this.debug.render(ctx);
    }
}

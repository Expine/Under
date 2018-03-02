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
        this.player = new Player(64, 200, 64, 64, chara);
        this.player.setRigidBody(new GravityElasticBody(this.player));
        this.player.setCollider(new CircleCollider(this.player, 32));
        this.stage.addEntity(this.player);

        let en = Context.image.loadImage(`res/image/chara/enemy.png`);
        let enemy = new Enemy(164, 200, 64, 64, en);
        enemy.setRigidBody(new GravityElasticBody(enemy));
        enemy.setCollider(new CircleCollider(enemy, 32));
        this.stage.addEntity(enemy);

        this.debug = new DebugLayer(this.stage);
    }

    update(dt) {
        this.stage.update(dt);
        this.debug.update(dt);
    }

    render(ctx) {
        this.stage.render(ctx);
        this.debug.render(ctx);
    }
}

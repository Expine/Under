/**
 * Game Scene
 * @classdesc Game scene class
 */
class GameScene extends Scene {
    constructor() {
        super();
        this.stage = (new ConcreteStageParser()).parse("res/stage/test.map", 800, 600);
        let chara = new Image();
        chara.src = "res/image/chara/player.png";
        this.player = new DefaultMutableObject(64, 200, 64, 64, chara);
        this.player.setStage(this.stage);
        this.player.setRigidBody(new DefaultRigidBody(this.player));
        this.player.setCollider(new CircleCollider(this.player, 32));
        this.stage.addEntity(this.player);
    }
    update(dt) {
        this.stage.update(dt);
        let it = 10;
        this.player.body.velocityX = 0;
        if (this.input.isUpPressed()) {
            this.player.body.velocityY = 0;
            this.player.body.velocityY = -it;
        }
        if (this.input.isDownPressed()) {
            this.player.body.velocityY = 0;
            this.player.body.velocityY = it;
        }
        if (this.input.isLeftPressed()) {
            this.player.body.velocityX = -it;
        }
        if (this.input.isRightPressed()) {
            this.player.body.velocityX = it;
        }
    }

    render(ctx) {
        this.stage.render(ctx);
    }
}
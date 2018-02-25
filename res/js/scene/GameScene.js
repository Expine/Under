/**
 * Game Scene
 * @classdesc Game scene class
 */
class GameScene extends Scene {
    constructor() {
        super();
        this.stage = (new DefaultStageParser()).parse("res/stage/test.map", 800, 600);
        let chara = new Image();
        chara.src = "res/image/chara/player.png";
        this.player = new DefaultMutableObject(64, 200, 64, 64, chara);
        this.stage.addEntity(this.player);
    }
    update(dt) {
        this.stage.update(dt);
        let it = 10;
        if (this.input.isUpPressed()) {
            this.player.y -= it;
        }
        if (this.input.isDownPressed()) {
            this.player.y += it;
        }
        if (this.input.isLeftPressed()) {
            this.player.x -= it;
        }
        if (this.input.isRightPressed()) {
            this.player.x += it;
        }
    }

    render(ctx) {
        this.stage.render(ctx);
    }
}
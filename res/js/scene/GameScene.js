/**
 * Game Scene
 * @classdesc Game scene class
 */
class GameScene extends Scene {
    constructor() {
        super();
        this.stage = (new DefaultStageParser()).parse("res/stage/test.map");
        let chara = new Image();
        chara.src = "res/image/chara/player.png"
        this.stage.addEntity(new MutableObject(64, 468, chara));
    }
    render(ctx) {
        this.stage.render(ctx);
    }
}
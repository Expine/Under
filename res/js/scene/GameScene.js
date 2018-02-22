/**
 * Game Scene
 * @classdesc Game scene class
 */
class GameScene extends Scene {
    constructor() {
        super();
        this.stage = new Stage();
        let image = new Image();
        image.src = "res/image/tile/tile.png";
        let chara = new Image();
        chara.src = "res/image/chara/player.png"
        for (let i = 0; i < 25; i++)
            this.stage.addEntity(new ImmutableObject(i * 32, 500, image));
        this.stage.addEntity(new ImmutableObject(64, 468, chara));
    }
    render(ctx) {
        let text = "Game Scene";
        ctx.fillStyle = "white";
        ctx.font = "50px Arial";
        ctx.fillText(text, 400 - ctx.measureText(text).width / 2, 300);
        this.stage.render(ctx);
    }
}
/**
 * Title Scene
 * @classdesc Title scene class
 */
class TitleScene extends Scene {
    render(ctx) {
        let text = "Press to Start";
        ctx.fillStyle = "white";
        ctx.font = "50px Arial";
        ctx.fillText(text, 400 - ctx.measureText(text).width / 2, 300);
        if (this.input.isYesPress()) {
            this.manager.replaceScene(new GameScene());
        }
    }
}
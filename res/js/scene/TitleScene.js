/**
 * Title Scene
 * @classdesc Title scene class
 */
class TitleScene extends Scene {
    render(ctx) {
        let text = "Press to Start";
        ctx.fillText(text, 400, 300, 0.5);
        if (this.input.isYesPress()) {
            this.manager.replaceScene(new GameScene());
        }
    }
}
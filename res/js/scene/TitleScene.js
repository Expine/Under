/**
 * Title Scene
 * @classdesc Title scene class
 */
class TitleScene extends Scene {
    render(ctx) {
        let text = "Press to Start";
        ctx.fillStyle = "white";
        ctx.font = "50px Arial";
        ctx.fillText(text, 400 - ctx.measureText(text), 300);
        if (this.input.isYesPress()) {
            engine.transition(new GameScene());
        }
    }
}
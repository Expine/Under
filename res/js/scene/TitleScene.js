/**
 * Title Scene
 * @classdesc Title scene class
 */
class TitleScene extends Scene {
    update(dt) {
        if (this.input.isYesPress())
            this.scene.replaceScene(new GameScene());
    }

    render(ctx) {
        /*
        ctx.fillText("Press to Start", 400, 300, 0.5);
        */
        ctx.stroke();
    }
}
/**
 * Title Scene
 * @classdesc Title scene class
 */
class TitleScene extends Scene {
    render(ctx) {
        ctx.fillStyle = "white";
        ctx.font = "50px Arial";
        ctx.fillText("Press to Start", 400, 300);
        if (engine.input.isKeyPressed(engine.input.K.YES)) {
            ctx.fillText("Key pressedt", 400, 400);
        }
    }
}
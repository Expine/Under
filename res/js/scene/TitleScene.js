/**
 * Title Scene
 * @classdesc Title scene class
 */
class TitleScene extends Scene {
    render(ctx) {
        ctx.fillStyle = "white"
        ctx.font = "50px Arial"
        ctx.fillText("Press to Start", 400, 300)
    }
}
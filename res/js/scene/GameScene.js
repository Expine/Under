/**
 * Game Scene
 * @classdesc Game scene class
 */
class GameScene extends Scene {
    render(ctx) {
        let text = "Game Scene";
        ctx.fillStyle = "white";
        ctx.font = "50px Arial";
        ctx.fillText(text, 400 - ctx.measureText(text), 300);
    }
}
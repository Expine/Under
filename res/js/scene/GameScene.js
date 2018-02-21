/**
 * Game Scene
 * @classdesc Game scene class
 */
class GameScene extends Scene {
    render(ctx) {
        ctx.fillStyle = "white";
        ctx.font = "50px Arial";
        ctx.fillText("Game Scene", 400, 300);
    }
}
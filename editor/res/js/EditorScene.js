/**
 * Scene of editor
 * To make stage
 * @implements {Scene}
 * @classdesc scene of making stage
 */
class EditorScene extends Scene {
    /**
     * Render stage editor
     * @param {CanvasRenderingContext2D} ctx
     */
    render(ctx) {
        let x = Math.floor(this.input.getMouseX() / 32) * 32;
        let y = Math.floor(this.input.getMouseY() / 32) * 32;
        ctx.strokeStyle = "white";
        ctx.strokeRect(x, y, 32, 32);
    }
}
/**
 * Editor context
 * - Controls rendering to the screen
 * - Renders by using HTML5 API
 * - ### Renders back by gray
 * @extends {CanvasContext}
 * @classdesc Editor context for rendering back by gray
 */
class EditorContext extends CanvasContext {
    /**
     * Function to be executed before drawing
     * @override
     */
    preRendering() {
        super.preRendering();
        this.ctx.fillStyle = `gray`;
        this.ctx.fillRect(0, 0, this.screen.width, this.screen.height);
    }
}

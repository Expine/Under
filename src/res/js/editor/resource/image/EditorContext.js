/**
 * Editor context
 * - Controls rendering to the screen
 * - Renders by using HTML5 API
 * - ### Renders back by gray
 * @extends {JSContext}
 * @classdesc Editor context for rendering back by gray
 */
class EditorContext extends JSContext {
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

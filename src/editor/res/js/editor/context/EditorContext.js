/**
 * Editor context
 * - Controls rendering to the screen
 * - Renders by using HTML5 API
 * - ### Renders back by gray
 * @extends {JSContext}
 * @classdesc Editor context for rendering back by gray
 */
class EditorContext extends JSContext { // eslint-disable-line  no-unused-vars
    /**
     * Function to be executed before drawing
     * @override
     */
    preRendering() {
        super.preRendering();
        this.ctx_.fillStyle = `gray`;
        this.ctx_.fillRect(0, 0, this.screen.width, this.screen.height);
    }
}

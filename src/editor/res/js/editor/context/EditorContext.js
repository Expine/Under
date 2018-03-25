/**
 * Context for rendering by JavaScript
 * Renders by using HTML5 API
 * Using by editor
 * @extends {JSContext}
 * @classdesc Context for rendering by JavaScript
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

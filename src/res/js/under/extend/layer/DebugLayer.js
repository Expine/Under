/**
 * Debug layer
 * Renders information necessary for debugging
 * @classdesc Debug layer to render information necessary for debugging
 */
class DebugLayer extends Layer { // eslint-disable-line  no-unused-vars
    /**
     * Debug layer constructor
     * @param {Stage} stage Stage instance
     */
    constructor(stage) {
        super();
        /**
         * Delta time for rendering
         * @type {number}
         */
        this.deltaTime = 0;
        this.stage = stage;
    }
    /**
     * Update layer
     * @interface
     * @param {number} dt - delta time
     */
    update(dt) {
        this.deltaTime = dt;
    }

    /**
     * Render layer
     * @interface
     * @param {Context} ctx
     */
    render(ctx) {
        ctx.fillText(this.deltaTime + ` msec`, Screen.it.width, 0, 1.0, 0.0, 20, `white`);
    }
}

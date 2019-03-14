/**
 * Debug layer
 * - Performs drawing processing collectively
 * - ### Renders information necessary for debugging
 * @extends {Layer}
 * @classdesc Debug layer to render information necessary for debugging
 */
class DebugLayer extends Layer {
    /**
     * Debug layer constructor
     * @constructor
     * @param {GaemDebugger} debug Debugger instance
     */
    constructor(debug) {
        super();

        /**
         * Stage instance
         * @protected
         * @type {GameDebugger}
         */
        this.debug = debug;
    }

    /**
     * Initialize layer
     * @override
     */
    init() {
        this.debug.init();
    }

    /**
     * Update layer
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        this.debug.update(dt);
    }

    /**
     * Render layer
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        Timer.it.render(ctx, this.x, this.y);
        this.debug.render(ctx, this.x + this.width, this.y);
    }
}

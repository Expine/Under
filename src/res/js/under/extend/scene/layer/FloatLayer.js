/**
 * Float layer
 * - Performs drawing processing collectively
 * - ### It can move freely
 * @extends {Layer}
 * @classdesc Float layer that can move freely
 */
class FloatLayer extends Layer {
    /**
     * Float layer constructor
     * @constructor
     * @param {Layer} delegate Delegte layer
     */
    constructor(delegate) {
        super();
        /**
         * Delegate layer
         * @protected
         * @type {Layer}
         */
        this.delegate = delegate;
    }

    /**
     * Set layer position
     * @override
     * @param {number} x Layer x position
     * @param {number} y Layer y position
     * @param {number} z Layer z position
     */
    setPosition(x, y, z) {
        super.setPosition(x, y, z);
        this.delegate.setPosition(x, y, z);
    }

    /**
     * Set layer size
     * @override
     * @param {number} width Layer width
     * @param {number} height Layer height
     */
    setSize(width, height) {
        super.setSize(width, height);
        this.delegate.setSize(width, height);
    }

    /**
     * Initialize scene
     * @override
     */
    init() {
        this.delegate.init();
    }

    /**
     * Update layer
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        this.delegate.update(dt);

        // TODO:: move in screen
    }

    /**
     * Render layer
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        this.delegate.render(ctx);
    }
}

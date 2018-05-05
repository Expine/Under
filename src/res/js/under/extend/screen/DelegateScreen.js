/**
 * Delegate screen
 * - Indicates the rendering target and input target
 * - ### Delegates the process to the destination
 * @interface
 * @extends {GameScreen}
 * @classdesc Delegate screen to delegate the process to the destination
 */
class DelegateScreen extends GameScreen { // eslint-disable-line  no-unused-vars
    /**
     * Generatable screen constructor
     * @constructor
     * @param {GameScreen} delegate Original screen
     */
    constructor(delegate) {
        super(delegate.width, delegate.height);

        /**
         * Original screen
         * @protected
         * @type {GameScreen}
         */
        this.delegate = delegate;
    }

    /**
     * Initialize screen
     * @override
     */
    init() {
        this.delegate.init();
    }

    /**
     * Get input target element
     * @override
     * @return {Element} Element of input target
     */
    getTarget() {
        return this.delegate.getTarget();
    }

    /**
     * Get canvas for rendering
     * @override
     * @return {Canvas} Canvas
     */
    getCanvas() {
        return this.delegate.getCanvas();
    }
}

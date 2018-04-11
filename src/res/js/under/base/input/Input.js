/**
 * Input
 * - ### Manages input event
 * @classdesc Input to manage input event
 */
class Input { // eslint-disable-line  no-unused-vars
    /**
     * Input constructor
     * @constructor
     */
    constructor() {
        /**
         * Screen instance for getting screen ratio
         * @protected
         * @type {Screen}
         */
        this.screen = null;

        Input.it = BaseUtil.implementsOf(this, IInput) ? this : null;
        Input.key = BaseUtil.implementsOf(this, IKey) ? this : null;
        Input.mouse = BaseUtil.implementsOf(this, IMouse) ? this : null;
    }

    /**
     * Set screen instance for getting screen ratio and setting inut target
     * @param {Screen} screen
     */
    setScreen(screen) {
        this.screen = screen;
    }

    /**
     * Initialize input
     * @interface
     */
    init() {}

    /**
     * Update input
     * @interface
     */
    update() {}

    /**
     * Clear input state
     * @interface
     * @protected
     */
    clear() {}
}

/**
 * Input singleton instance
 * @static
 * @type {IInput}
 */
Input.it = null;
/**
 * Key input instance
 * @static
 * @type {IKey}
 */
Input.key = null;
/**
 * Mouse input instance
 * @static
 * @type {IMouse}
 */
Input.mouse = null;

/**
 * Input
 * - ### Manages input event
 * @interface
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
         * @type {GameScreen}
         */
        this.screen = null;

        Input.key = BaseUtil.implementsOf(this, IKey) ? this : null;
        Input.mouse = BaseUtil.implementsOf(this, IMouse) ? this : null;
    }

    /**
     * Set screen instance for getting screen ratio and setting inut target
     * @param {GameScreen} screen
     */
    setScreen(screen) {
        this.screen = screen;
    }

    /**
     * Initialize input
     * @abstract
     */
    init() {}

    /**
     * Update input
     * @abstract
     */
    update() {}
}

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

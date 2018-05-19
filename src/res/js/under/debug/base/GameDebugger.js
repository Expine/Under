/**
 * Game debugger
 * - ### Registers debug information
 * @interface
 * @classdesc Game debugger for registering debug information
 */
class GameDebugger { // eslint-disable-line  no-unused-vars
    /**
     * Game debugger constructor
     * @constructor
     */
    constructor() {
        // set singleton
        GameDebugger.it = this;
    }

    /**
     * Register debug information
     * @abstract
     * @param {string} name Debug information name
     * @param {string} value Debug information value
     */
    register(name, value) {}

    /**
     * Initialize debugger
     * @abstract
     */
    init() {}

    /**
     * Update debugger
     * @abstract
     * @param {number} dt Delta time
     */
    update(dt) {}

    /**
     * Render debugger
     * @abstract
     * @param {Context} ctx Canvas context
     * @param {number} x Debugger x position
     * @param {number} y Debugger y position
     */
    render(ctx, x, y) {}
}

/**
 * Instance for singleton
 * @type {GameDebugger}
 */
GameDebugger.it = null;

/**
 * Whether it is debug mode or not
 * @static
 * @type {boolean}
 */
GameDebugger.debug = false;

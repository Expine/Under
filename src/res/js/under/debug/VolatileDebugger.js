/**
 * Volatile debugger
 * - Registers debug information
 * - ### Resets infromation for each update
 * @classdesc Volatile debugger to reset information for each update
 */
class VolatileDebugger extends Debugger { // eslint-disable-line  no-unused-vars
    /**
     * Volatile debugger constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Registered debug information
         * @protected
         * @type {Object<string, string>}
         */
        this.registeredData = {};

        /**
         * Debug information for rendering
         * @protected
         * @type {Array<string>}
         */
        this.renderingData = [];
    }

    /**
     * Register debug information
     * @override
     * @param {string} name Debug information name
     * @param {string} value Debug information value
     */
    register(name, value) {
        this.registeredData[name] = value;
    }

    /**
     * Update debugger
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        this.renderingData.length = 0;
        for (let it in this.registeredData) {
            if (this.registeredData.hasOwnProperty(it)) {
                this.renderingData.push(this.registeredData[it]);
            }
        }
        this.registeredData = {};
    }

    /**
     * Render debugger
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} x Debugger x position
     * @param {number} y Debugger y position
     */
    render(ctx, x, y) {
        for (let it of this.renderingData) {
            ctx.fillText(`${it}`, x, y, 1.0, 0.0, 20, `white`);
            y += 30;
        }
    }
}

/**
 * Instance for singleton
 * @type {Debugger}
 */
Debugger.it = null;

/**
 * Whether it is debug mode or not
 * @static
 * @type {boolean}
 */
Debugger.debug = false;

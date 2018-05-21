/**
 * Simple Timer
 * - Measure the time
 * - ### Measure time by Date
 * @extends {Timer}
 * @classdesc Simple TImer to measure time by Date
 */
class SimpleTimer extends Timer { // eslint-disable-line  no-unused-vars
    /**
     * Simple timer constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Named timer for measuring time
         * @protected
         * @type {Object<string, number>}
         */
        this.namedTimer = {};

        /**
         * Named timer for registering start time
         * @protected
         * @type {Object<string, number>}
         */
        this.namedStartTimer = {};
    }

    /**
     * Start to measure timer by name
     * @override
     * @param {string} name Timer name
     */
    startTimer(name) {
        this.namedStartTimer[name] = +(new Date());
    }

    /**
     * Stop measuring timer by name
     * @override
     * @param {string} name Timer name
     */
    stopTimer(name) {
        this.namedTimer[name] = +(new Date()) - this.namedStartTimer[name];
    }

    /**
     * Get timer by name
     * @override
     * @param {string} name Timer name
     * @return {number} Timer by name
     */
    getTimer(name) {
        return this.namedTimer[name];
    }

    /**
     * Render timer
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} x Timer x position
     * @param {number} y Timer y position
     */
    render(ctx, x, y) {
        for (const name in this.namedTimer) {
            if (this.namedTimer.hasOwnProperty(name)) {
                ctx.fillText(`${name} : ${this.getTimer(name)} msec`, x, y, 0.0, 0.0, 20, `white`);
                y += 30;
            }
        }
    }
}

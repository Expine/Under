/**
 * Timer
 * - ### Measure the time
 * @interface
 * @classdesc TImer to measure the time
 */
class Timer { // eslint-disable-line  no-unused-vars
    /**
     * Timer constructor
     * @constructor
     */
    constructor() {
        /**
         * Delta time
         * @protected
         * @type {number}
         */
        this.deltaTime = 0;

        // set singleton
        Timer.it = this;
    }

    /**
     * Start to measure timer by name
     * @abstract
     * @param {string} name Timer name
     */
    startTimer(name) {}

    /**
     * Stop measuring timer by name
     * @abstract
     * @param {string} name Timer name
     */
    stopTimer(name) {}

    /**
     * Get timer by name
     * @abstract
     * @param {string} name Timer name
     * @return {number} Timer by name
     */
    getTimer(name) {}

    /**
     * Initialize timer
     * @abstract
     */
    init() {}

    /**
     * Update timer
     * @param {number} dt Delta time
     */
    update(dt) {
        this.deltaTime = dt;
    }

    /**
     * Render timer
     * @abstract
     * @param {Context} ctx Canvas context
     * @param {number} x Timer x position
     * @param {number} y Timer y position
     */
    render(ctx, x, y) {}
}

/**
 * Instance for singleton
 * @type {Timer}
 */
Timer.it = null;

/**
 * Timer
 * Measure the time
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

        /**
         * Instance for singleton
         * @type {Timer}
         */
        Timer.it = this;
    }
    /**
     * Initialize timer
     * @interface
     */
    init() {}

    /**
     * Update timer
     * @interface
     * @param {number} dt Delta time
     */
    update(dt) {
        this.deltaTime = dt;
    }

    /**
     * Start to measure timer by name
     * @interface
     * @param {string} name Timer name
     */
    startTimer(name) {}

    /**
     * Stop measuring timer by name
     * @interface
     * @param {string} name Timer name
     */
    stopTimer(name) {}

    /**
     * Get timer by name
     * @interface
     * @param {string} name Timer name
     * @return {number} Timer by name
     */
    getTimer(name) {}

    /**
     * Get name of registered timer
     * @interface
     * @return {Array<string>}
     */
    getRegisteredNames() {}
}

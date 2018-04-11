/**
 * Simple Timer
 * - Measure the time
 * - ### Measure time by Date
 * @implements {Timer}
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
         * Start time
         * @protected
         * @type {number}
         */
        this.initTime = +(new Date());

        /**
         * Named timer for measuring time
         * @protected
         * @type {Dictionary<string. number>}
         */
        this.namedTimer = {};

        /**
         * Named timer for registering start time
         * @protected
         * @type {Dictionary<string. number>}
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
     * Get name of registered timer
     * @override
     * @return {Array<string>}
     */
    getRegisteredNames() {
        let names = [];
        for (let name in this.namedTimer) {
            if (this.namedTimer.hasOwnProperty(name)) {
                names.push(name);
            }
        }
        return names;
    }
}

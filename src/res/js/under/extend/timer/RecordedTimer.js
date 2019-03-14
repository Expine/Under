/**
 * Simple Timer
 * - Measure the time
 * - ### Measure time by Date
 * @extends {Timer}
 * @classdesc Simple TImer to measure time by Date
 */
class RecordedTimer extends SimpleTimer {
    /**
     * Simple timer constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Elapsed time
         * @protected
         * @type {number}
         */
        this.elapsedTime = 0;

        /**
         * Recorded time
         * @protected
         * @type {Object<string, Array<number>>}
         */
        this.recordedTime = {};

        /**
         * Recorded max time
         * @protected
         * @type {Object<string, number>}
         */
        this.maxTime = {};
        /**
         * Recorded min time
         * @protected
         * @type {Object<string, number>}
         */
        this.minTime = {};
        /**
         * Recorded mean time
         * @protected
         * @type {Object<string, number>}
         */
        this.meanTime = {};
    }

    /**
     * Update timer
     * @param {number} dt Delta time
     */
    update(dt) {
        super.update(dt);
        for (const it in this.namedTimer) {
            if (this.namedTimer.hasOwnProperty(it)) {
                if (this.recordedTime[it] === undefined) {
                    this.recordedTime[it] = [];
                }
                this.recordedTime[it].push(this.namedTimer[it]);
            }
        }

        // register
        this.elapsedTime += dt;
        if (this.elapsedTime > 1000) {
            this.elapsedTime -= 1000;
            for (const it in this.recordedTime) {
                if (this.recordedTime.hasOwnProperty(it)) {
                    this.maxTime[it] = 0;
                    this.minTime[it] = Number.MAX_SAFE_INTEGER;
                    this.meanTime[it] = 0;
                    for (const e of this.recordedTime[it]) {
                        this.maxTime[it] = Math.max(this.maxTime[it], e);
                        this.minTime[it] = Math.min(this.minTime[it], e);
                        this.meanTime[it] += e;
                    }
                    this.meanTime[it] = Math.floor(this.meanTime[it] / this.recordedTime[it].length);
                    this.recordedTime[it].length = 0;
                }
            }
        }
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
                const max = this.maxTime[name] === undefined ? 0 : this.maxTime[name];
                const min = this.minTime[name] === undefined ? 0 : this.minTime[name];
                const mean = this.meanTime[name] === undefined ? 0 : this.meanTime[name];
                ctx.fillText(`${name} : ${max} - ${min} (${mean}) msec`, x, y, 0.0, 0.0, 20, `white`);
                y += 30;
            }
        }
    }
}

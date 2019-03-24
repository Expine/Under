import { SimpleTimer } from './SimpleTimer';
import { Context } from '../../base/resources/image/Context';
/**
 * Simple Timer
 * - Measure time by Date
 * @extends {Timer}
 * @classdesc Simple TImer to measure time by Date
 */
export class RecordedTimer extends SimpleTimer {
    /**
     * Elapsed time
     * @protected
     * @type {number}
     */
    protected elapsedTime: number;

    /**
     * Recorded time
     * @protected
     * @type {Object<string, Array<number>>}
     */
    protected recordedTime: { [s: string]: Array<number>; }

    /**
     * Recorded max time
     * @protected
     * @type {Object<string, number>}
     */
    protected maxTime: { [s: string]: number; }
    /**
     * Recorded min time
     * @protected
     * @type {Object<string, number>}
     */
    protected minTime: { [s: string]: number; }
    /**
     * Recorded mean time
     * @protected
     * @type {Object<string, number>}
     */
    protected meanTime: { [s: string]: number; }

    /**
     * Recorded timer constructor
     * @constructor
     */
    constructor() {
        super();

        this.elapsedTime = 0;
        this.recordedTime = {};
        this.maxTime = {};
        this.minTime = {};
        this.meanTime = {};
    }

    /**
     * Update timer
     * @param {number} dt Delta time
     */
    update(dt: number) {
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
    render(ctx: Context, x: number, y: number) {
        for (const name in this.namedTimer) {
            if (this.namedTimer.hasOwnProperty(name)) {
                const max = this.maxTime[name] === undefined ? 0 : this.maxTime[name];
                const min = this.minTime[name] === undefined ? 0 : this.minTime[name];
                const mean = this.meanTime[name] === undefined ? 0 : this.meanTime[name];
                ctx.fillText(`${name} : ${max} - ${min} (${mean}) msec`, x, y, 0.0, 0.0, 20, `white`, null);
                y += 30;
            }
        }
    }
}

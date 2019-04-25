import { SimpleTimer } from './SimpleTimer';
import { Context } from '../../base/resources/image/Context';
/**
 * - Measure time and record it.
 * - Measure max, min, mean time from recorded time.
 * @classdesc Measure time and record it to calculate max, min, mean time.
 */
export class RecordedTimer extends SimpleTimer
{
    /**
     * Elapsed time
     */
    protected elapsedTime: number;

    /**
     * Recorded time
     */
    protected recordedTime: { [s: string]: Array<number>; }

    /**
     * Recorded max time
     */
    protected maxTime: { [s: string]: number; }
    /**
     * Recorded min time
     */
    protected minTime: { [s: string]: number; }
    /**
     * Recorded mean time
     */
    protected meanTime: { [s: string]: number; }

    constructor()
    {
        super();

        this.elapsedTime = 0;
        this.recordedTime = {};
        this.maxTime = {};
        this.minTime = {};
        this.meanTime = {};
    }

    /**
     * @override
     */
    update(dt: number)
    {
        super.update(dt);
        // record named timer
        for (const it in this.namedTimer) {
            if (this.recordedTime[it] === undefined) {
                this.recordedTime[it] = [];
            }
            this.recordedTime[it].push(this.namedTimer[it]);
        }

        // register
        this.elapsedTime += dt;
        if (this.elapsedTime > 1000) {
            this.elapsedTime -= 1000;
            for (const it in this.recordedTime) {
                this.maxTime[it] = 0;
                this.minTime[it] = Number.MAX_SAFE_INTEGER;
                this.meanTime[it] = 0;
                // calculate max, min, mean time
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

    /**
     * @override
     */
    render(ctx: Context, x: number, y: number)
    {
        for (const name in this.namedTimer) {
            const max = this.maxTime[name] === undefined ? 0 : this.maxTime[name];
            const min = this.minTime[name] === undefined ? 0 : this.minTime[name];
            const mean = this.meanTime[name] === undefined ? 0 : this.meanTime[name];
            ctx.fillText(`${name} : ${max} - ${min} (${mean}) msec`, x, y, 0.0, 0.0, 20, `white`, null);
            y += 30;
        }
    }
}

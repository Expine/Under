import { SimpleTimer } from './SimpleTimer';
import { Context } from '../../base/resources/image/Context';
/**
 * - Measure time and record it.
 * - Measure max, min, mean time from recorded time.
 * @classdesc Measure time and record it to calculate max, min, mean time.
 */
export class RecordedTimer
    extends SimpleTimer
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
        for (const name in this.mNamedTimers) {
            if (this.recordedTime[name] === undefined) {
                this.recordedTime[name] = [];
            }
            this.recordedTime[name].push(this.mNamedTimers[name]);
        }

        // register
        this.elapsedTime += dt;
        if (this.elapsedTime > 1000) {
            this.elapsedTime -= 1000;
            for (const name in this.recordedTime) {
                this.maxTime[name] = 0;
                this.minTime[name] = Number.MAX_SAFE_INTEGER;
                this.meanTime[name] = 0;
                // calculate max, min, mean time
                for (const time of this.recordedTime[name]) {
                    this.maxTime[name] = Math.max(this.maxTime[name], time);
                    this.minTime[name] = Math.min(this.minTime[name], time);
                    this.meanTime[name] += time;
                }
                this.meanTime[name] = Math.floor(
                    this.meanTime[name] / this.recordedTime[name].length
                );
                this.recordedTime[name].length = 0;
            }
        }
    }

    /**
     * @override
     */
    render(ctx: Context, x: number, y: number)
    {
        for (const name in this.mNamedTimers) {
            const max = this.maxTime[name] || 0;
            const min = this.minTime[name] || 0;
            const mean = this.meanTime[name] || 0;
            ctx.fillText(
                `${name} : ${max} - ${min} (${mean}) msec`, x, y, 0.0, 0.0,
                20, 'white'
            );
            y += 30;
        }
    }
}

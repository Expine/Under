import { Timer } from "../../base/timer/Timer";
import { Context } from "../../base/resources/image/Context";

/**
 * - Measure time by Date structure.
 */
export class SimpleTimer
    extends Timer
{
    /**
     * Named timer for measuring time.
     */
    protected mNamedTimers: { [s: string]: number; };

    /**
     * Named timer for registering start time.
     */
    protected mMamedStartTimers: { [s: string]: number; };

    constructor()
    {
        super();

        this.mNamedTimers = {};
        this.mMamedStartTimers = {};
    }

    /**
     * @override
     */
    startTimer(aName: string) { this.mMamedStartTimers[aName] = +(new Date()); }

    /**
     * @override
     */
    stopTimer(aName: string)
    {
        this.mNamedTimers[aName] =
            +(new Date()) - this.mMamedStartTimers[aName];
    }

    /**
     * @override
     */
    getTimer(aName: string): number { return this.mNamedTimers[aName]; }

    /**
     * @override
     */
    render(ctx: Context, x: number, y: number)
    {
        for (const name in this.mNamedTimers) {
            ctx.fillText(
                `${name} : ${this.getTimer(name)} msec`, x, y, 0.0, 0.0,
                20, `white`
            );
            y += 30;
        }
    }
}

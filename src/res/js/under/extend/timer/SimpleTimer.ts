import { Timer } from "../../base/timer/Timer";
import { Context } from "../../base/resources/image/Context";

/**
 * - Measure time by Date structure.
 */
export class SimpleTimer extends Timer
{
    /**
     * Named timer for measuring time.
     */
    protected namedTimer: { [s: string]: number; };

    /**
     * Named timer for registering start time.
     */
    protected namedStartTimer: { [s: string]: number; };

    constructor()
    {
        super();

        this.namedTimer = {};
        this.namedStartTimer = {};
    }

    /**
     * @override
     */
    startTimer(name: string) { this.namedStartTimer[name] = +(new Date()); }

    /**
     * @override
     */
    stopTimer(name: string) { this.namedTimer[name] = +(new Date()) - this.namedStartTimer[name]; }

    /**
     * @override
     */
    getTimer(name: string): number { return this.namedTimer[name]; }

    /**
     * @override
     */
    init() { }

    /**
     * @override
     */
    render(ctx: Context, x: number, y: number)
    {
        for (const name in this.namedTimer) {
            ctx.fillText(`${name} : ${this.getTimer(name)} msec`, x, y, 0.0, 0.0, 20, `white`, "");
            y += 30;
        }
    }
}

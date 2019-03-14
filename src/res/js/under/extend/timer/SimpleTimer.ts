import { Timer } from "../../base/timer/Timer";
import { Context } from "../../base/resources/image/Context";

/**
 * Simple Timer
 * - Measure time by Date
 * @extends {Timer}
 * @classdesc Simple TImer to measure time by Date
 */
export class SimpleTimer extends Timer {
    /**
     * Named timer for measuring time
     * @protected
     * @type {Object<string, number>}
     */
    protected namedTimer: { [s: string]: number; };

    /**
     * Named timer for registering start time
     * @protected
     * @type {Object<string, number>}
     */
    protected namedStartTimer: { [s: string]: number; };

    /**
     * Simple timer constructor
     * @constructor
     */
    constructor() {
        super();

        this.namedTimer = {};
        this.namedStartTimer = {};
    }

    /**
     * Start to measure timer by name
     * @override
     * @param {string} name Timer name
     */
    startTimer(name: string) {
        this.namedStartTimer[name] = +(new Date());
    }

    /**
     * Stop measuring timer by name
     * @override
     * @param {string} name Timer name
     */
    stopTimer(name: string) {
        this.namedTimer[name] = +(new Date()) - this.namedStartTimer[name];
    }

    /**
     * Get timer by name
     * @override
     * @param {string} name Timer name
     * @return {number} Timer by name
     */
    getTimer(name: string): number {
        return this.namedTimer[name];
    }

    /**
     * Initialize timer
     * @override
     */
    init() {

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
                ctx.fillText(`${name} : ${this.getTimer(name)} msec`, x, y, 0.0, 0.0, 20, `white`, "");
                y += 30;
            }
        }
    }
}

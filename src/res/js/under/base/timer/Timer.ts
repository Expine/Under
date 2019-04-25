import { Context } from "../resources/image/Context";

/**
 * - Measure the time.
 * @abstract
 */
export abstract class Timer
{
    /**
     * Instance for singleton
     */
    static it: Timer;

    /**
     * Delta time
     */
    protected deltaTime: number;
    /**
     * @return Delta time that indicateselapsed time since previous frame.
     */
    getDeltatime(): number { return this.deltaTime; }

    constructor()
    {
        this.deltaTime = 0;

        // set singleton
        Timer.it = this;
    }

    /**
     * Start to measure timer by name.
     * @param name Timer name for starting to measure time.
     */
    abstract startTimer(name: string): void;

    /**
     * Stop measuring timer by name.
     * @param name Timer name for stopping measuring time.
     */
    abstract stopTimer(name: string): void;

    /**
     * @param name Timer name to get.
     * @return Timer that has the name.
     */
    abstract getTimer(name: string): number;

    /**
     * Initialize timer.
     */
    abstract init(): void;

    /**
     * Update timer.
     * @param dt Delta time.
     */
    update(dt: number) { this.deltaTime = dt; }

    /**
     * Render timer.
     * @param ctx Canvas context for rendering.
     * @param x Timer x position.
     * @param y Timer y position.
     */
    abstract render(ctx: Context, x: number, y: number): void;
}

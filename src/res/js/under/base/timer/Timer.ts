import { Context } from "../resources/image/Context";

/**
 * - Measure the time.
 * @abstract
 */
export abstract class Timer
{
    /**
     * Instance for singleton.
     */
    private static It: Timer;

    /**
     * Delta time.
     */
    protected mDeltaTime: number;

    constructor()
    {
        this.mDeltaTime = 0;

        // set singleton
        Timer.It = this;
    }

    /**
     * @return Instance for singleton.
     */
    static get it(): Timer { return Timer.It; }
    /**
     * @return Delta time that indicateselapsed time since previous frame.
     */
    get deltaTime(): number { return this.mDeltaTime; }


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
     * Update timer.
     * @param aDt Delta time.
     */
    update(aDt: number) { this.mDeltaTime = aDt; }

    /**
     * Render timer.
     * @param ctx Canvas context for rendering.
     * @param x Timer x position.
     * @param y Timer y position.
     */
    abstract render(ctx: Context, x: number, y: number): void;
}

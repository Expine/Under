import { Context } from "../../base/resources/image/Context";

/**
 * - Registers debug information.
 */
export abstract class GameDebugger
{
    /**
     * Instance for singleton.
     */
    static it: GameDebugger;

    /**
     * Whether it is debug mode or not.
     */
    static debug = false;

    constructor()
    {
        // set singleton
        GameDebugger.it = this;
    }

    /**
     * Register debug information by name.
     * @param name Debug information name.
     * @param value Debug information value.
     */
    abstract register(name: string, value: string): void;

    /**
     * Initialize debugger.
     * @abstract
     */
    abstract init(): void;

    /**
     * Update debugger.
     * @param dt Delta time.
     */
    abstract update(dt: number): void;

    /**
     * Render debugger.
     * @param ctx Canvas context
     * @param x Debugger x position
     * @param y Debugger y position
     */
    abstract render(ctx: Context, x: number, y: number): void;
}


/**
 * - Indicates the rendering target and input target.
 * @abstract
 */
export abstract class GameScreen
{
    /**
     * Instance for singleton.
     */
    static it: GameScreen;

    /**
     * Game screen ratio.
     */
    protected gameSize: number;
    /**
     * @return Game screen ratio.
     */
    getGameSize(): number { return this.gameSize; }

    /**
     * @param width Width of game screen size.
     * @param height Height of game screen size.
     */
    constructor(protected width: number, protected height: number)
    {
        this.gameSize = 1;

        // set singleton
        GameScreen.it = this;
    }

    /**
     * @return Width of game screen.
     */
    getWidth(): number { return this.width; }
    /**
     * @return Height of game screen.
     */
    getHeight(): number { return this.height; }

    /**
     * @return Element of input target.
     */
    abstract getTarget(): HTMLElement;

    /**
     * @return Canvas for rendering.
     */
    abstract getCanvas(): HTMLCanvasElement;
}


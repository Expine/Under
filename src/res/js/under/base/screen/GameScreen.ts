/**
 * - Indicates the rendering target and input target.
 * @abstract
 */
export abstract class GameScreen
{
    /**
     * Instance for singleton.
     */
    private static It: GameScreen;

    /**
     * Game screen ratio.
     */
    protected mGameSize: number;

    /**
     * @param mWidth Width of game screen size.
     * @param mHeight Height of game screen size.
     */
    constructor(protected mWidth: number, protected mHeight: number)
    {
        this.mGameSize = 1;

        // set singleton
        GameScreen.It = this;
    }

    /**
     * @return Instance for singleton
     */
    static get it(): GameScreen { return GameScreen.It; }
    /**
     * @return Game screen ratio.
     */
    get gameSize(): number { return this.mGameSize; }
    /**
     * @return Width of game screen.
     */
    get width(): number { return this.mWidth; }
    /**
     * @return Height of game screen.
     */
    get height(): number { return this.mHeight; }

    /**
     * @return Element of input target.
     */
    abstract getTarget(): HTMLElement;

    /**
     * @return Canvas for rendering.
     */
    abstract getCanvas(): HTMLCanvasElement;
}


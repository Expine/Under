import { GameScreen } from "../../base/screen/GameScreen";

/**
 * - Delegates the process to the destination.
 * @abstract
 */
export abstract class DelegateScreen
    extends GameScreen
{
    /**
    * @param delegate Original screen for delegating the process.
    */
    constructor(protected delegate: GameScreen)
    {
        super(delegate.width, delegate.height);
    }

    /**
     * @override
     */
    getTarget(): HTMLElement { return this.delegate.getTarget(); }

    /**
     * @override
     */
    getCanvas(): HTMLCanvasElement { return this.delegate.getCanvas(); }
}

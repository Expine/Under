import { IMouse, isIMouse } from './IMouse';
import { IKey, isIKey } from './IKey';
import { GameScreen } from '../screen/GameScreen';

/**
 * - Manage input event to update input state.
 * @abstract
 */
export abstract class Input
{
    /**
     * Singleton instance for getting key state
     */
    private static mKey: IKey;
    /**
     * Singleton instance for getting mouse state
     */
    private static mMouse: IMouse;

    /**
     * @param screen Screen for getting screen ratio.
     */
    constructor(protected screen: GameScreen)
    {
        // set singleton
        if (isIKey(this)) { Input.mKey = this; }
        if (isIMouse(this)) { Input.mMouse = this; }
    }

    /**
     * @return Singleton instance for getting key state
     */
    static get key(): IKey { return this.mKey; }
    /**
     * @return Singleton instance for getting mouse state
     */
    static get mouse(): IMouse { return this.mMouse; }

    /**
     * Update input state
     */
    public abstract update(): void;
}

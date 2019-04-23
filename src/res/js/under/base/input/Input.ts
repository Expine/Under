import { IMouse, isIMouse } from './IMouse';
import { IKey, isIKey } from './IKey';
import { GameScreen } from '../screen/GameScreen';

/**
 * - Manage input event to update input state
 * @abstract
 */
export abstract class Input
{
    /**
     * Singleton instance for getting key state
     */
    static key: IKey;
    /**
     * Singleton instance for getting mouse state
     */
    static mouse: IMouse;

    /**
     * @param screen Screen for getting screen ratio.
     */
    constructor(protected screen: GameScreen)
    {
        // set singleton
        if (isIKey(this)) {
            Input.key = this;
        }
        if (isIMouse(this)) {
            Input.mouse = this;
        }
    }

    /**
     * Initialize input sate
     */
    public abstract init(): void;

    /**
     * Update input state
     */
    public abstract update(): void;
}

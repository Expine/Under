/**
 * - Get input state.
 * - Manipulate input state and blocking.
 * @classdesc Get and manipulate input state.
 */
export interface IInput
{
    /**
     * Clear all input state.
     */
    clear(): void;

    /**
     * Set whether input is enable.
     * @param aEnable Whether input is enable.
     */
    setEnable(aEnable: boolean): void;

    /**
     * Block input.
     * @param aCode Target code for blocking.
     */
    block(aCode: number): void;
    /**
     * Unblock input.
     * @param aCode Target code for unblocking.
     */
    unblock(aCode: number): void;

    /**
     * Press target input.
     * @param aCode Target code for pressing.
     */
    press(aCode: number): void;
    /**
     * Unpress target input.
     * @param aCode Target code for unpressing.
     */
    unpress(aCode: number): void;

    /**
     * Judge whether pressed right now.
     * @param aCode Target code for judging.
     * @return whether pressed right now.
     */
    isPress(aCode: number): boolean;
    /**
     * Judge whether pressed.
     * @param aCode Target code.
     * @return whether pressed.
     */
    isPressed(aCode: number): boolean;
}

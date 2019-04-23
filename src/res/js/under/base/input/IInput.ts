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
     * @param enable Whether input is enable.
     */
    setInputEnable(enable: boolean): void;

    /**
     * Block input.
     * @param code Target code for blocking.
     */
    blockInput(code: number): void;
    /**
     * Unblock input.
     * @param code Target code for unblocking.
     */
    unblockInput(code: number): void;

    /**
     * Press target code
     * @param code Target code for pressing.
     */
    press(code: number): void;
    /**
     * Unpress target code
     * @param code Target code for unpressing.
     */
    unpress(code: number): void;

    /**
     * Judge whether pressed right now.
     * @param code Target code for judging.
     * @return whether pressed right now.
     */
    isPress(code: number): boolean;
    /**
     * Judge whether pressed.
     * @param code Target code.
     * @return whether pressed.
     */
    isPressed(code: number): boolean;
}

/**
 * Input interface
 * - It can get input state and meddle input system
 * @interface
 * @classdesc Input interface that can get input state and meddle input system
 */
export interface IInput {
    /**
     * Clear input state
     * @abstract
     */
    clear(): void;

    /**
     * Set inpt enable
     * @abstract
     * @param {boolean} enable Input enable
     */
    setInputEnable(enable: boolean): void;

    /**
     * Block input
     * @abstract
     * @param {number} code Target code
     */
    blockInput(code: number): void;

    /**
     * Unblock input
     * @abstract
     * @param {number} code Target code
     */
    unblockInput(code: number): void;

    /**
     * Press target code
     * @abstract
     * @param {number} code Target code
     */
    press(code: number): void;

    /**
     * Unpress target code
     * @abstract
     * @param {number} code Target code
     */
    unpress(code: number): void;

    /**
     * Judge whether pressed now
     * @abstract
     * @param {number} code Target code
     * @return {boolean} whether pressed now
     */
    isPress(code: number): boolean;

    /**
     * Judge whether pressed
     * @abstract
     * @param {number} code Target code
     * @return {boolean} whether pressed
     */
    isPressed(code: number): boolean;
}

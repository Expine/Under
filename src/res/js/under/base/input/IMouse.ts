import { IInput } from './IInput';

/**
 * - Get mouse code and position.
 */
export interface IMouse
    extends IInput
{
    /**
     * Get mouse right code.
     * @return Mouse right code.
     */
    mRight(): number;
    /**
     * Get mouse left code.
     * @return Mouse left code.
     */
    mLeft(): number;
    /**
     * Get mouse center code.
     * @return Mouse center code.
     */
    mCenter(): number;

    /**
     * Get mouse x position.
     * @return mouse x position.
     */
    getMouseX(): number;
    /**
     * Get mouse x position.
     * @return mouse x position.
     */
    getMouseY(): number;
}

/**
 * Type guard for IMouse
 */
export const isIMouse = (arg: any): arg is IMouse =>
    arg !== null && arg.getMouseX !== undefined;

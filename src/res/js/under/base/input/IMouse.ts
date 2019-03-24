import { IInput } from './IInput';
/**
 * Mouse interface
 * - Get mouse code and position
 * @interface
 * @extends {IInput}
 * @classdesc Mouse interface to get mouse code and position
 */
export interface IMouse extends IInput {
    /**
     * Get mouse right code
     * @abstract
     * @return {number} Mouse right code
     */
    mRight(): number;
    /**
     * Get mouse left code
     * @abstract
     * @return {number} Mouse left code
     */
    mLeft(): number;
    /**
     * Get mouse center code
     * @abstract
     * @return {number} Mouse center code
     */
    mCenter(): number;

    /**
     * Get mouse x position
     * @abstract
     * @return mouse x position
     */
    getMouseX(): number;

    /**
     * Get mouse x position
     * @abstract
     * @return mouse x position
     */
    getMouseY(): number;
}

/**
 * Type guard for IMouse
 */
export const isIMouse = (arg: any): arg is IMouse => arg !== null && arg.getMouseX !== undefined;

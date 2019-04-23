import { IInput } from './IInput';

/**
 * - Get key code.
 */
export interface IKey
    extends IInput
{
    /**
     * Get A key code.
     * @return A key code.
     */
    a(): number;
    /**
     * Get 0 key code.
     * @return 0 key code.
     */
    zero(): number;
    /**
     * Get space key code.
     * @return Space key code.
     */
    space(): number;

    /**
     * Get right key code.
     * @return Right key code.
     */
    right(): number;
    /**
     * Get left key code.
     * @return Left key code.
     */
    left(): number;
    /**
     * Get up key code.
     * @return Up key code.
     */
    up(): number;
    /**
     * Get down key code.
     * @return Down key code.
     */
    down(): number;

    /**
     * Get yes key code.
     * @return Yes key code.
     */
    yes(): number;
    /**
     * Get no key code.
     * @return No key code.
     */
    no(): number;
    /**
     * Get sub key code.
     * @return Sub key code.
     */
    sub(): number;
}

/**
 * Type guard for IKey
 */
export const isIKey = (arg: any): arg is IKey =>
    arg !== null && arg.yes !== undefined;

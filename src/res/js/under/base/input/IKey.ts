import { IInput } from './IInput';
/**
 * Key interface
 * - Gets key code
 * @interface
 * @extends {IInput}
 * @classdesc Key interface to get key code
 */
export interface IKey extends IInput {
    /**
     * Get A key code
     * @abstract
     * @return {number} A key code
     */
    a(): number;
    /**
     * Get 0 key code
     * @abstract
     * @return {number} 0 key code
     */
    zero(): number;
    /**
     * Get space key code
     * @abstract
     * @return {number} Space key code
     */
    space(): number;

    /**
     * Get right key code
     * @abstract
     * @return {number} Right key code
     */
    right(): number;
    /**
     * Get left key code
     * @abstract
     * @return {number} Left key code
     */
    left(): number;
    /**
     * Get up key code
     * @abstract
     * @return {number} Up key code
     */
    up(): number;
    /**
     * Get down key code
     * @abstract
     * @return {number} Down key code
     */
    down(): number;

    /**
     * Get yes key code
     * @abstract
     * @return {number} Yes key code
     */
    yes(): number;
    /**
     * Get no key code
     * @abstract
     * @return {number} No key code
     */
    no(): number;
    /**
     * Get sub key code
     * @abstract
     * @return {number} Sub key code
     */
    sub(): number;
}

/**
 * Type guard for IKey
 */
export const isIKey = (arg: any): arg is IKey => arg.yes !== undefined;

/**
 * Exclude interface
 * - Acquire the ID of the exclusion target
 * @interface
 * @classdesc Exclude interface to acquire the ID of the exclusion target
 */
export interface IExclude {
    /**
     * Get excluded target ID
     * @abstract
     * @return {number}
     */
    getTargetID(): number;
}

/**
 * Type guard for IExclude
 */
export const isIExclude = (arg: any): arg is IExclude => arg !== null && arg.getTargetID !== undefined;

/**
 * Breakable interface
 * - Object that can be destroyed
 * @interface
 * @classdesc Breakable interface that can be destroyed
 */
export interface IBreakable {
    /**
     * Destroy object
     * @abstract
     */
    destroy(): void;
}

/**
 * Type guard for IBreakable
 */
export const isIBreakable = (arg: any): arg is IBreakable => arg !== null && arg.destroy !== undefined;

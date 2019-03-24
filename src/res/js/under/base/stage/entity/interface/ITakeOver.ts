/**
 * Playable interface
 * - Player function interface
 * @interface
 * @classdesc Playable interface for player function
 */
export interface ITakeOver {
    /**
     * Judged whether it is the same entity to be handed over
     * @abstract
     * @param {Object} target Target element
     * @return {boolean} Whether it is the same entity to be handed over
     */
    equals(target: object): boolean;

    /**
     * Take over information
     * @abstract
     * @param {Object} target Target element
     */
    takeOver(target: object): void;
}

/**
 * Type guard for ITakeOver
 */
export const isITakeOver = (arg: any): arg is ITakeOver => arg !== null && arg.takeOver !== undefined;

/**
 * Prepare state interface
 * - Sets the power to be applied and the magnification of the elapsed speed of the preparation time
 * @interface
 * @classdesc Prepare state interface to set the applied power and the magnification of preparation time
 */
export interface IPrepareState {
    /**
     * Set the magnification of the elapsed speed of the preparation time
     * @abstract
     * @param {number} val The magnification of the elapsed speed of the preparation time
     */
    setSpeedMagnification(val: number): void;

    /**
     * Set the power to be applied
     * @abstract
     * @param {number} val The power to be applied
     */
    setAppliedPower(val: number): void;

    /**
     * Get the magnification of the elapsed speed of the preparation time
     * @abstract
     * @return {number} The magnification of the elapsed speed of the preparation time
     */
    getSpeedMagnification(): number;

    /**
     * Get the power to be applied
     * @abstract
     * @return {number} The power to be applied
     */
    getAppliedPower(): number;
}

/**
 * Type guard for IPrepareState
 */
export const isIPrepareState = (arg: any): arg is IPrepareState => arg !== null && arg.getAppliedPower !== undefined;

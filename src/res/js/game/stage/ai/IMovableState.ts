/**
 * Movable state interface
 * - Sets max velocity and move power for moving
 * @interface
 * @classdesc Movable state interface to set max velocity and move power
 */
export interface IMovableState {
    /**
     * Get max velocity of x
     * @abstract
     * @return {number} Max velocity of x
     */
    getMaxVX(): number;

    /**
     * Get max velocity of y
     * @abstract
     * @return {number} Max velocity of y
     */
    getMaxVY(): number;

    /**
     * Get power of x
     * @abstract
     * @return {number} Power of x
     */
    getMovePX(): number;

    /**
     * Get power of y
     * @abstract
     * @return {number} Power of y
     */
    getMovePY(): number;

    /**
     * Set max velocity
     * @abstract
     * @param {number} maxVelocityX The max velocity of x direction
     * @param {number} maxVelocityY The max velocity of y direction
     */
    setMaxVelocity(maxVelocityX: number, maxVelocityY: number): void;

    /**
     * Set moving power
     * @abstract
     * @param {number} movePowerX The power of x direction
     * @param {number} movePowerY The power of y direction
     */
    setMovePower(movePowerX: number, movePowerY: number): void;
}

/**
 * Type guard for IMovableState
 */
export const isIMovableState = (arg: any): arg is IMovableState => arg !== null && arg.setMovePower !== undefined;

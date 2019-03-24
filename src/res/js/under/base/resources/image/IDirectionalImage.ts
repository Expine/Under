/**
 * Directional imageimage interface
 * - Considers the direction
 * @interface
 * @classdesc Directional imageimage interface to consider the direction
 */
export interface IDirectionalImage {
    /**
     * Set direction of image
     * @abstract
     * @param {number} directionX Direction of x
     * @param {number} directionY Direction of y
     */
    setDirection(directionX: number, directionY: number): void;
}

/**
 * Type guard for IDirectionalImage
 */
export const isIDirectionalImage = (arg: any): arg is IDirectionalImage => arg !== null && arg.setDirection !== undefined;

/**
 * Input order
 * - Indicates order for delegation of input
 * @abstract
 * @classdesc Input order to indicate order for delegation of input
 */
export abstract class InputOrder {
    /**
     * Initialize input order
     * @abstract
     */
    abstract init(): void;

    /**
     * Destructor of input order
     * @abstract
     */
    abstract destruct(): void;

    /**
     * Update input order
     * @abstract
     * @param {number} dt Delta time
     * @return {boolean} Whether order is ended or not
     */
    abstract udpate(dt: number): boolean;
}

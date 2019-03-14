/**
 * Exclude interface
 * - ### Acquire the ID of the exclusion target
 * @interface
 * @classdesc Exclude interface to acquire the ID of the exclusion target
 */
class IExclude extends Interface {
    /**
     * Get excluded target ID
     * @abstract
     * @type {number}
     */
    getTargetID() {}
}

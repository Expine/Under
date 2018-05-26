/**
 * Owned interface
 * - ### Owned by someone
 * @interface
 * @classdesc Owned interface owned by someone
 */
class IOwned extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Set owned entity
     * @abstract
     * @param {Entity} owner Owned entity
     */
    setOwner(owner) {}

    /**
     * Get owned entity
     * @abstract
     * @return {Entity} Owned entity
     */
    getOwner() {}
}

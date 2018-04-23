/**
 * Material
 * - ### Object information
 * - ### If the object has a Collider, it must be held
 * @interface
 * @classdesc Material that indicates object information
 */
class Material { // eslint-disable-line  no-unused-vars
    /**
     * Get mass
     * @abstract
     * @return {number} Mass
     */
    get mass() {}

    /**
     * Get coefficient of restitution
     * @abstract
     * @return {number} Coefficient of restitution
     */
    get e() {}

    /**
     * Get coefficient of restitution
     * @abstract
     * @return {number} Coefficient of restitution
     */
    get mu() {}
}

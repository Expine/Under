/**
 * Material
 * - ### Object information
 * - ### If the object has a Collider, it must be held
 * @classdesc Material that indicates object information
 */
class Material { // eslint-disable-line  no-unused-vars
    /**
     * Get mass
     * @interface
     * @return {number} Mass
     */
    get mass() { }

    /**
     * Get coefficient of restitution
     * @interface
     * @return {number} Coefficient of restitution
     */
    get e() { }

    /**
     * Get coefficient of restitution
     * @interface
     * @return {number} Coefficient of restitution
     */
    get mu() { }
}

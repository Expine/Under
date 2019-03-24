/**
 * Material
 * - Object information
 * - If the object has a Collider, it must be held
 * @abstract
 * @classdesc Material that indicates object information
 */
export abstract class Material {
    /**
     * Get mass
     * @abstract
     * @return {number} Mass
     */
    abstract get mass(): number;

    /**
     * Get coefficient of restitution
     * @abstract
     * @return {number} Coefficient of restitution
     */
    abstract get e(): number;

    /**
     * Get coefficient of restitution
     * @abstract
     * @return {number} Coefficient of restitution
     */
    abstract get mu(): number;
}

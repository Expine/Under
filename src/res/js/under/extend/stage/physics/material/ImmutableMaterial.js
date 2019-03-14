/**
 * Default material
 * - Object information
 * - If the object has a Collider, it must be held
 * - ### Manages it as immutable information
 * @extends {Material}
 * @classdesc Default material to manage it as immutable information
 */
class ImmutableMaterial extends Material {
    /**
     * Default material constructor
     * @param {number} mass Entity mass
     * @param {number} elasticity Coefficient of restitution
     * @param {number} mu Coefficient of friction
     */
    constructor(mass = 10, elasticity = 0.1, mu = 0.6) {
        super();

        /**
         * Entity mass
         * @protected
         * @type {number}
         */
        this.massVal = mass;

        /**
         * Coefficient of restitution
         * @protected
         * @type {number}
         */
        this.eVal = elasticity;

        /**
         * Coefficient of friction
         * @protected
         * @type {number}
         */
        this.muVal = mu;
    }

    /**
     * Get mass
     * @override
     * @return {number} Mass
     */
    get mass() {
        return this.massVal;
    }

    /**
     * Get coefficient of restitution
     * @override
     * @return {number} Coefficient of restitution
     */
    get e() {
        return this.eVal;
    }

    /**
     * Get coefficient of restitution
     * @override
     * @return {number} Coefficient of restitution
     */
    get mu() {
        return this.muVal;
    }
}

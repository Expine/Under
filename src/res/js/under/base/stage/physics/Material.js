/**
 * Material
 * Object information
 * If the object has a Collider, it must be held
 */
class Material { // eslint-disable-line  no-unused-vars
    /**
     * Material constructor
     * @param {number} mass Entity mass
     * @param {number} elasticity Coefficient of restitution
     * @param {number} mu Coefficient of friction
     */
    constructor(mass, elasticity, mu) {
        /**
         * Entity mass
         * @type {number}
         */
        this.mass = mass;

        /**
         * Coefficient of restitution
         * @type {number}
         */
        this.e = elasticity;

        /**
         * Coefficient of friction
         * @type {number}
         */
        this.mu = mu;
    }
}

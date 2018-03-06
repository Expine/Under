/**
 * Default Material
 * Object default information
 * If the object has a Collider, it must be held
 */
class DefaultMaterial extends Material { // eslint-disable-line  no-unused-vars
    /**
     * Material constructor
     * @param {number} mass Entity mass
     * @param {number} elasticity Coefficient of restitution
     * @param {number} mu Coefficient of friction
     */
    constructor(mass = 10, elasticity = 0.0, mu = 0.6) {
        super(mass, elasticity, mu);
    }
}

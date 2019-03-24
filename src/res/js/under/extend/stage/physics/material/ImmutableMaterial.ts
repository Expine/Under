import { Material } from "../../../../base/stage/physics/material/Material";

/**
 * Default material
 * - Manages it as immutable information
 * @extends {Material}
 * @classdesc Default material to manage it as immutable information
 */
export class ImmutableMaterial extends Material {
    /**
     * Entity mass
     * @protected
     * @type {number}
     */
    protected massVal: number;

    /**
     * Coefficient of restitution
     * @protected
     * @type {number}
     */
    protected eVal: number;

    /**
     * Coefficient of friction
     * @protected
     * @type {number}
     */
    protected muVal: number;

    /**
     * Default material constructor
     * @param {number} mass Entity mass
     * @param {number} elasticity Coefficient of restitution
     * @param {number} mu Coefficient of friction
     */
    constructor(mass: number = 10, elasticity: number = 0.1, mu: number = 0.6) {
        super();
        this.massVal = mass;
        this.eVal = elasticity;
        this.muVal = mu;
    }

    /**
     * Get mass
     * @override
     * @return {number} Mass
     */
    get mass(): number {
        return this.massVal;
    }

    /**
     * Get coefficient of restitution
     * @override
     * @return {number} Coefficient of restitution
     */
    get e(): number {
        return this.eVal;
    }

    /**
     * Get coefficient of restitution
     * @override
     * @return {number} Coefficient of restitution
     */
    get mu(): number {
        return this.muVal;
    }
}

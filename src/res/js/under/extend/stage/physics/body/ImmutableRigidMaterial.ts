import { RigidMaterial } from "../../../../base/stage/physics/body/RigidMaterial";

/**
 * Immutable rigid material
 * - Manages it as immutable information excluded velocity and acceleration
 * @extends {RigidMaterial}
 * @classdesc Immutable rigid material to manage as immutable information exclueded velocity and acceleration
 */
export class ImmutableRigidMaterial extends RigidMaterial {
    /**
     * Coefficient of air resistance
     * @protected
     * @type {number}
     */
    protected kVal: number;
    /**
     * Coefficient of x friction coefficient
     * @protected
     * @type {number}
     */
    protected frictionXVal: number;
    /**
     * Coefficient of y friction coefficient
     * @protected
     * @type {number}
     */
    protected frictionYVal: number;

    /**
     * Gravity scale
     * @protected
     * @type {number}
     */
    protected gVal: number;

    /**
     * Immutable rigid material constructor
     * @constructor
     * @param {number} [k = 0.5] Coefficient of air resistance
     * @param {number} [frictionX = 1] Coefficient of x friction coefficient
     * @param {number} [frictionY = 0] Coefficient of y friction coefficient
     * @param {number} [g = 1] Gravity scale
     */
    constructor(k: number = 0.5, frictionX: number = 1, frictionY: number = 0, g: number = 1) {
        super();
        this.kVal = k;
        this.frictionXVal = frictionX;
        this.frictionYVal = frictionY;
        this.gVal = g;
    }

    /**
     * Get coefficient of air resistance
     * @override
     * @return {number} Coefficient of air resistance
     */
    get k(): number {
        return this.kVal;
    }

    /**
     * Get coefficient of x friction coefficient
     * @override
     * @return {number} Coefficient of x friction coefficient
     */
    get frictionX(): number {
        return this.frictionXVal;
    }

    /**
     * Get coefficient of y friction coefficient
     * @override
     * @return {number} Coefficient of y friction coefficient
     */
    get frictionY(): number {
        return this.frictionYVal;
    }

    /**
     * Get gravity scale
     * @abstract
     * @return {number} Gravity scale
     */
    get gravityScale(): number {
        return this.gVal;
    }
}

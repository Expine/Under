import { ImmutableRigidMaterial } from "./ImmutableRigidMaterial";

/**
 * Mutable rigid material
 * - Manaes it as mutable
 * @extends {ImmutableRigidMaterial}
 * @classdesc Mutable rigid material to manage as mutable
 */
export class MutableRigidMaterial extends ImmutableRigidMaterial {
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

    /**
     * Set coefficient of air resistance
     * @override
     * @param {number} val Coefficient of air resistance
     */
    set k(val: number) {
        this.kVal = val;
    }

    /**
     * Set coefficient of x friction coefficient
     * @override
     * @param {number} val Coefficient of x friction coefficient
     */
    set frictionX(val: number) {
        this.frictionXVal = val;
    }

    /**
     * Set coefficient of y friction coefficient
     * @override
     * @param {number} val Coefficient of y friction coefficient
     */
    set frictionY(val: number) {
        this.frictionYVal = val;
    }

    /**
     * Set gravity scale
     * @override
     * @param {number} val Gravity scale
     */
    set gravityScale(val: number) {
        this.gVal = val;
    }
}

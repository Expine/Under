/**
 * Mutable rigid material
 * - Manages physical quantity
 * - Manages it as immutable information excluded velocity and acceleration
 * - ### Manaes it as mutable
 * @extends {ImmutableRigidMaterial}
 * @classdesc Mutable rigid material to manage as mutable
 */
class MutableRigidMaterial extends ImmutableRigidMaterial {
    /**
     * Get coefficient of air resistance
     * @override
     * @return {number} Coefficient of air resistance
     */
    get k() {
        return this.kVal;
    }

    /**
     * Get coefficient of x friction coefficient
     * @override
     * @return {number} Coefficient of x friction coefficient
     */
    get frictionX() {
        return this.frictionXVal;
    }

    /**
     * Get coefficient of y friction coefficient
     * @override
     * @return {number} Coefficient of y friction coefficient
     */
    get frictionY() {
        return this.frictionYVal;
    }

    /**
     * Get gravity scale
     * @abstract
     * @return {number} Gravity scale
     */
    get gravityScale() {
        return this.gVal;
    }

    /**
     * Set coefficient of air resistance
     * @override
     * @param {number} val Coefficient of air resistance
     */
    set k(val) {
        this.kVal = val;
    }

    /**
     * Set coefficient of x friction coefficient
     * @override
     * @param {number} val Coefficient of x friction coefficient
     */
    set frictionX(val) {
        this.frictionXVal = val;
    }

    /**
     * Set coefficient of y friction coefficient
     * @override
     * @param {number} val Coefficient of y friction coefficient
     */
    set frictionY(val) {
        this.frictionYVal = val;
    }

    /**
     * Set gravity scale
     * @override
     * @param {number} val Gravity scale
     */
    set gravityScale(val) {
        this.gVal = val;
    }
}

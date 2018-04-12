/**
 * Rigid material
 * - Manages physical quantity
 * - ### Manages it as immutable information excluded velocity and acceleration
 * @classdesc Rigid body to manage physical quantity
 */
class ImmutableRigidMaterial { // eslint-disable-line  no-unused-vars
    /**
     * Rigid body constructor
     * @constructor
     * @param {number} [k = 0.5] Coefficient of air resistance
     * @param {number} [frictionX = 1] Coefficient of x friction coefficient
     * @param {number} [frictionY = 0] Coefficient of y friction coefficient
     */
    constructor(k = 0.5, frictionX = 1, frictionY = 0) {
        /**
         * Coefficient of air resistance
         * @protected
         * @type {number}
         */
        this.kVal = 0.5;
        /**
         * Coefficient of x friction coefficient
         * @protected
         * @type {number}
         */
        this.frictionXVal = 1;
        /**
         * Coefficient of y friction coefficient
         * @protected
         * @type {number}
         */
        this.frictionYVal = 0;
    }

    /**
     * Reset rigid material state
     * @interface
     */
    reset() {}

    /**
     * Get coefficient of air resistance
     * @interface
     * @return {number} Coefficient of air resistance
     */
    get k() {
        return this.kVal;
    }

    /**
     * Get coefficient of x friction coefficient
     * @interface
     * @return {number} Coefficient of x friction coefficient
     */
    get frictionX() {}

    /**
     * Get coefficient of y friction coefficient
     * @interface
     * @return {number} Coefficient of y friction coefficient
     */
    get frictionY() {}
}

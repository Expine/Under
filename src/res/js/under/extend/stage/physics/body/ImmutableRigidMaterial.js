/**
 * Rigid material
 * - Manages physical quantity
 * - ### Manages it as immutable information excluded velocity and acceleration
 * @classdesc Rigid body to manage physical quantity
 */
class ImmutableRigidMaterial extends RigidMaterial { // eslint-disable-line  no-unused-vars
    /**
     * Rigid body constructor
     * @constructor
     * @param {number} [k = 0.5] Coefficient of air resistance
     * @param {number} [frictionX = 1] Coefficient of x friction coefficient
     * @param {number} [frictionY = 0] Coefficient of y friction coefficient
     * @param {number} [g = 1] Gravity scale
     */
    constructor(k = 0.5, frictionX = 1, frictionY = 0, g = 1) {
        super();
        /**
         * Coefficient of air resistance
         * @protected
         * @type {number}
         */
        this.kVal = k;
        /**
         * Coefficient of x friction coefficient
         * @protected
         * @type {number}
         */
        this.frictionXVal = frictionX;
        /**
         * Coefficient of y friction coefficient
         * @protected
         * @type {number}
         */
        this.frictionYVal = frictionY;

        /**
         * Gravity scale
         * @protected
         * @type {number}
         */
        this.gVal = g;
    }

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
}

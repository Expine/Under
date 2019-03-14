/**
 * Rigid material
 * - ### Manages physical quantity
 * @interface
 * @classdesc Rigid body to manage physical quantity
 */
class RigidMaterial {
    /**
     * Rigid body constructor
     * @constructor
     */
    constructor() {
        /**
         * Horizontal velocity of entity
         * @type {number}
         */
        this.velocityX = 0;
        /**
         * Vertical velocity of entity
         * @type {number}
         */
        this.velocityY = 0;
        /**
         * Horizontal acceleration of entity
         * @type {number}
         */
        this.accelerationX = 0;
        /**
         * Vertical acceleration of entity
         * @type {number}
         */
        this.accelerationY = 0;
    }

    /**
     * Reset rigid material state
     */
    reset() {
        this.velocityX = 0;
        this.velocityY = 0;
        this.accelerationX = 0;
        this.accelerationY = 0;
    }

    /**
     * Get coefficient of air resistance
     * @abstract
     * @return {number} Coefficient of air resistance
     */
    get k() {}

    /**
     * Get coefficient of x friction coefficient
     * @abstract
     * @return {number} Coefficient of x friction coefficient
     */
    get frictionX() {}

    /**
     * Get coefficient of y friction coefficient
     * @abstract
     * @return {number} Coefficient of y friction coefficient
     */
    get frictionY() {}

    /**
     * Get gravity scale
     * @abstract
     * @return {number} Gravity scale
     */
    get gravityScale() {}

    /**
     * Set coefficient of air resistance
     * @abstract
     * @param {number} val Coefficient of air resistance
     */
    set k(val) {}

    /**
     * Set coefficient of x friction coefficient
     * @abstract
     * @param {number} val Coefficient of x friction coefficient
     */
    set frictionX(val) {}

    /**
     * Set coefficient of y friction coefficient
     * @abstract
     * @param {number} val Coefficient of y friction coefficient
     */
    set frictionY(val) {}

    /**
     * Set gravity scale
     * @abstract
     * @param {number} val Gravity scale
     */
    set gravityScale(val) {}
}

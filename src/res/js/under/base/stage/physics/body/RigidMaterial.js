/**
 * Rigid material
 * - ### Manages physical quantity
 * @interface
 * @classdesc Rigid body to manage physical quantity
 */
class RigidMaterial { // eslint-disable-line  no-unused-vars
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
}

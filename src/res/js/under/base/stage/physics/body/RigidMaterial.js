/**
 * Rigid material
 * - ### Manages physical quantity
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

        /**
         * Coefficient of air resistance
         * @type {number}
         */
        this.k = 0.5;
        /**
         * Coefficient of x friction coefficient
         * @type {number}
         */
        this.frictionX = 1;
        /**
         * Coefficient of y friction coefficient
         * @type {number}
         */
        this.frictionY = 0;
    }

    /**
     * Reset rigid material state
     * @interface
     */
    reset() { }

    /**
     * Get coefficient of air resistance
     * @interface
     * @return {number} Coefficient of air resistance
     */
    get k() { }

    /**
     * Get coefficient of x friction coefficient
     * @interface
     * @return {number} Coefficient of x friction coefficient
     */
    get frictionX() { }

    /**
     * Get coefficient of y friction coefficient
     * @interface
     * @return {number} Coefficient of y friction coefficient
     */
    get frictionY() { }
}

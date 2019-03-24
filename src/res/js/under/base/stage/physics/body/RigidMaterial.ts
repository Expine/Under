/**
 * Rigid material
 * - Manages physical quantity
 * @abstract
 * @classdesc Rigid body to manage physical quantity
 */
export abstract class RigidMaterial {
    /**
     * Horizontal velocity of entity
     * @type {number}
     */
    velocityX: number;
    /**
     * Vertical velocity of entity
     * @type {number}
     */
    velocityY: number;
    /**
     * Horizontal acceleration of entity
     * @type {number}
     */
    accelerationX: number;
    /**
     * Vertical acceleration of entity
     * @type {number}
     */
    accelerationY: number;

    /**
     * Rigid body constructor
     * @constructor
     */
    constructor() {
        this.velocityX = 0;
        this.velocityY = 0;
        this.accelerationX = 0;
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
    abstract get k(): number;

    /**
     * Get coefficient of x friction coefficient
     * @abstract
     * @return {number} Coefficient of x friction coefficient
     */
    abstract get frictionX(): number;

    /**
     * Get coefficient of y friction coefficient
     * @abstract
     * @return {number} Coefficient of y friction coefficient
     */
    abstract get frictionY(): number;

    /**
     * Get gravity scale
     * @abstract
     * @return {number} Gravity scale
     */
    abstract get gravityScale(): number;

    /**
     * Set coefficient of air resistance
     * @abstract
     * @param {number} val Coefficient of air resistance
     */
    abstract set k(val: number);

    /**
     * Set coefficient of x friction coefficient
     * @abstract
     * @param {number} val Coefficient of x friction coefficient
     */
    abstract set frictionX(val: number);

    /**
     * Set coefficient of y friction coefficient
     * @abstract
     * @param {number} val Coefficient of y friction coefficient
     */
    abstract set frictionY(val: number);

    /**
     * Set gravity scale
     * @abstract
     * @param {number} val Gravity scale
     */
    abstract set gravityScale(val: number);
}

/**
 * Rigid body
 * - ### Update entity by physical quantity
 * @classdesc Rigid body to update entity by phsycal quantity
 */
class RigidBody { // eslint-disable-line  no-unused-vars
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

        /**
         * Difference of previous x position (actural x velocity)
         * @type {number}
         */
        this.diffX = 0;
        /**
         * Difference of previous y position (actural y velocity)
         * @type {number}
         */
        this.diffY = 0;

        /**
         * Whether it is fixed for x direction or not
         * @type {bool}
         */
        this.isFixX = false;
        /**
         * Whether it is fixed for y direction or not
         * @type {bool}
         */
        this.isFixY = false;

        /**
         * Whether it is enabled or not
         * @protected
         * @type {bool}
         */
        this.enable = true;
    }

    /**
     * Set mutable entity
     * @param {MutableObject} entity Mutable entity
     */
    setEntity(entity) {
        /**
         * Mutable entity attaching rigid body
         * @type {MutableObject}
         */
        this.entity = entity;
    }

    /**
     * Set enable or not
     * @param {bool} enable Whether it is enabled or not
     */
    setEnable(enable) {
        this.enable = enable;
    }

    /**
     * Reset rigid body state
     */
    reset() {
        this.velocityX = 0;
        this.velocityY = 0;
        this.accelerationX = 0;
        this.accelerationY = 0;
        this.diffX = 0;
        this.diffY = 0;
        this.isFixX = false;
        this.isFixY = false;
    }

    /**
     * Initialize body
     * @interface
     */
    init() {}

    /**
     * Set the value added to the next speed vector
     * @interface
     * @param {number} vx X component of the velocity vector to be added
     * @param {number} vy Y component of the velocity vector to be added
     */
    setNextAddVelocity(vx, vy) {}

    /**
     * Apply force to objects
     * @param {number} forceX Force in x direction
     * @param {number} forceY Force in y direction
     */
    enforce(forceX, forceY) {}

    /**
     * Update by rigid body
     * @interface
     * @param {number} dt delta time
     */
    update(dt) {}
}

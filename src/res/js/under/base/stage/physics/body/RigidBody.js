/**
 * Rigid body
 * @classdesc Physics item for rigid body
 */
class RigidBody { // eslint-disable-line  no-unused-vars
    /**
     * Rigid body constructor
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
         * X velocity of the previous frame
         * @type {number}
         */
        this.preVelocityX = 0;
        /**
         * Y velocity of the previous frame
         * @type {number}
         */
        this.preVelocityY = 0;
        /**
         * Horizontal acceleration of entity of the previous frame
         * @type {number}
         */
        this.preAccelerationX = 0;
        /**
         * Vertical acceleration of entity of the previous frame
         * @type {number}
         */
        this.preAccelerationY = 0;

        /**
         * Coefficient of air resistance
         * @type {number}
         */
        this.k = 0.5;
    }

    /**
     * Set mutabel entity
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

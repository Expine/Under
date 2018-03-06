/**
 * Rigid body
 * @classdesc Physics item for rigid body
 */
class RigidBody { // eslint-disable-line  no-unused-vars
    /**
     * Rigid body constructor
     * @param {Entity} entity Target entity
     */
    constructor(entity) {
        /**
         * Entity attaching rigid body
         * @type {Entity}
         */
        this.entity = entity;
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
    }

    /**
     * Update by rigid body
     * @interface
     * @param {number} dt delta time
     */
    update(dt) {}

    /**
     * Apply force to objects
     * @param {number} forceX Force in x direction
     * @param {number} forceY Force in y direction
     */
    enforce(forceX, forceY) {}
}

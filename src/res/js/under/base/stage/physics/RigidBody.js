/**
 * Rigid body
 * @classdesc Physics item for rigid body
 */
class RigidBody { // eslint-disable-line  no-unused-vars
    /**
     * Rigid body constructor
     * @param {Entity} entity Target entity
     * @param {number} mass Entity mass
     * @param {number} elasticity Coefficient of restitution
     * @param {number} mu Coefficient of friction
     */
    constructor(entity, mass, elasticity, mu) {
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
         * Entity mass
         * @type {number}
         */
        this.mass = mass;

        /**
         * Coefficient of restitution
         * @type {number}
         */
        this.e = elasticity;

        /**
         * Coefficient of friction
         * @type {number}
         */
        this.mu = mu;
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

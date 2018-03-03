/**
 * Default rigid body sample
 * @implements {RigidBody}
 * @classdesc rigid body sample
 */
class GravityElasticBody extends RigidBody { // eslint-disable-line  no-unused-vars
    /**
     * Default rigid body constructor
     * @param {Entity} entity target entity
     */
    constructor(entity) {
        super();
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

        this.mass = 10;

        /**
         * Gravity power
         * @type {number}
         */
        this.gravity = 9.8 * 300;

        /**
         * Coefficient of restitution
         * @type {number}
         */
        this.e = 0.0;
    }

    /**
     * Update by rigid body
     * @override
     * @param {number} dt delta time
     */
    update(dt) {
        this.velocityX += this.accelerationX * dt / 1000;
        this.velocityY += this.accelerationY * dt / 1000;
        this.entity.x += this.velocityX * dt / 1000;
        this.entity.y += this.velocityY * dt / 1000;
        this.accelerationX = 0;
        this.accelerationY = this.gravity / this.mass;
    }

    /**
     * Apply force to objects
     * @param {number} forceX Force in x direction
     * @param {number} forceY Force in y direction
     */
    enforce(forceX, forceY) {
        this.accelerationX += forceX * this.mass;
        this.accelerationY += forceY * this.mass;
    }
}

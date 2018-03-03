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

        this.shiftX_ = 0;
        this.shiftY_ = 0;
    }

    /**
     * Update by rigid body
     * @override
     * @param {number} dt delta time
     */
    update(dt) {
        this.velocityX += this.accelerationX * dt / 1000;
        this.velocityY += this.accelerationY * dt / 1000;
        this.shiftX_ = this.velocityX;
        this.shiftY_ = this.velocityY;
        this.entity.x += this.velocityX * dt / 1000;
        this.entity.y += this.velocityY * dt / 1000;
        this.accelerationX = 0;
        this.accelerationY = this.gravity / this.mass;
    }

    /**
     * Get x difference of movement
     * @interface
     * @return {number} X difference of movement
     */
    getMoveDifferentialX() {
        return this.shiftX_;
    }

    /**
     * Get y difference of movement
     * @interface
     * @return {number} Y difference of movement
     */
    getMoveDifferentialY() {
        return this.shiftY_;
    }

    /**
     * Apply force to objects
     * @param {number} forceX Force in x direction
     * @param {number} forceY Force in y direction
     */
    enforce(forceX, forceY) {
        this.accelerationX += forceX * 300 / this.mass;
        this.accelerationY += forceY * 300 / this.mass;
    }

    /**
     * Repulsion for reversing velocity
     * Should not zero vector
     * @override
     * @param {number} rx X component of the reference vector
     * @param {number} ry Y component of the reference vector
     */
    repulsion(rx, ry, dt) {
        let dot = rx * this.velocityX + ry * this.velocityY;
        // If there is a velocity vector on the opposite side of the reference vector, do not process
        if (dot < 0) {
            return;
        }
        /*
        let cos2 = dot * dot / ((rx * rx + ry * ry) * (this.velocityX * this.velocityX + this.velocityY * this.velocityY));
        let cos = Math.sqrt(cos2);
        let sin = Math.sqrt(1 - cos2);
        let velocity = Math.sqrt(this.velocityX * this.velocityX + this.velocityY * this.velocityY);
        */
        //        this.accelerationX = -this.velocityX * (1 + this.e) * 1000 / dt;
        //        this.accelerationY = -this.velocityY * (1 + this.e) * 1000 / dt;
        // this.velocityX = -this.velocityX * this.e;
        // this.velocityY = -this.velocityY * this.e;
    }
}

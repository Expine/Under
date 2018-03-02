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

        /**
         * Gravity power
         * @type {number}
         */
        this.gravity = 9.8;

        /**
         * Coefficient of restitution
         * @type {number}
         */
        this.e = 0.2;
    }

    /**
     * Update by rigid body
     * @override
     * @param {number} dt delta time
     */
    update(dt) {
        this.velocityX += this.accelerationX * dt / 1000;
        this.velocityY += (this.accelerationY + this.gravity) * dt / 1000;
        this.entity.x += this.velocityX;
        this.entity.y += this.velocityY;
    }

    /**
     * Repulsion for reversing velocity
     * Should not zero vector
     * @override
     * @param {number} rx X component of the reference vector
     * @param {number} ry Y component of the reference vector
     */
    repulsion(rx, ry) {
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
        this.velocityX = -this.velocityX * this.e;
        this.velocityY = -this.velocityY * this.e;
    }
}

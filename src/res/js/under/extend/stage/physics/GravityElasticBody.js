/**
 * Default rigid body sample
 * @implements {RigidBody}
 * @classdesc rigid body sample
 */
class GravityElasticBody extends RigidBody { // eslint-disable-line  no-unused-vars
    /**
     * Update by rigid body
     * @override
     * @param {number} dt delta time
     */
    update(dt) {
        this.velocityX += this.accelerationX * dt / 1000;
        this.velocityY += this.accelerationY * dt / 1000;
        let dx = Math.abs(this.velocityX) > 1 ? this.velocityX * dt / 1000 : 0;
        let dy = Math.abs(this.velocityY) > 1 ? this.velocityY * dt / 1000 : 0;
        this.entity.deltaMove(dx, dy);
        this.accelerationX = 0;
        this.accelerationY = 0;
    }

    /**
     * Apply force to objects
     * @param {number} forceX Force in x direction
     * @param {number} forceY Force in y direction
     */
    enforce(forceX, forceY) {
        this.accelerationX += forceX / this.mass;
        this.accelerationY += forceY / this.mass;
    }
}

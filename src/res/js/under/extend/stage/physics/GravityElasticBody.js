/**
 * Default rigid body sample
 * @implements {RigidBody}
 * @classdesc rigid body sample
 */
class GravityElasticBody extends RigidBody { // eslint-disable-line  no-unused-vars
    /**
     * Rigid body constructor
     * @param {Entity} entity Target entity
     * @param {number} [mass=1] Entity mass
     * @param {number} [elasticity=0.0] Coefficient of restitution
     * @param {number} [mu=0.6] Coefficient of friction
     */
    constructor(entity, mass = 1, elasticity = 0.0, mu = 0.6) {
        super(entity, mass, elasticity, mu);
        entity.setMaterial(new DefaultMaterial(mass, elasticity, mu));
    }


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
        this.accelerationX += forceX / this.entity.material.mass;
        this.accelerationY += forceY / this.entity.material.mass;
    }
}

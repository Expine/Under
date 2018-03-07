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
    constructor(entity, mass = 1, elasticity = 0.1, mu = 0.95) {
        super(entity, mass, elasticity, mu);
        entity.setMaterial(new DefaultMaterial(mass, elasticity, mu));

        this.vpx = 0;
        this.vpy = 0;
        this.vmx = 0;
        this.vmy = 0;
    }

    /**
     * Set the value added to the next speed vector
     * @interface
     * @param {number} vx X component of the velocity vector to be added
     * @param {number} vy Y component of the velocity vector to be added
     */
    setNextAddVelocity(vx, vy) {
        if (vx > 0) {
            this.vpx = Math.max(this.vpx, vx);
        } else {
            this.vmx = Math.min(this.vmx, vx);
        }
        if (vy > 0) {
            this.vpy = Math.min(this.vpy, vy);
        } else {
            this.vmy = Math.min(this.vmy, vy);
        }
    }

    /**
     * Update by rigid body
     * @override
     * @param {number} dt delta time
     */
    update(dt) {
        this.velocityX += this.vpx + this.vmx;
        this.velocityY += this.vpy + this.vmy;
        this.velocityX += this.accelerationX * dt / 1000;
        this.velocityY += this.accelerationY * dt / 1000;
        let kx = -this.velocityX * this.k / this.entity.material.mass * dt / 1000;
        let ky = -this.velocityY * this.k / this.entity.material.mass * dt / 1000;
        if (Math.abs(this.velocityX) < Math.abs(kx)) {
            this.velocityX = 0;
        } else {
            this.velocityX += kx;
        }
        if (Math.abs(this.velocityY) < Math.abs(ky)) {
            this.velocityY = 0;
        } else {
            this.velocityY += ky;
        }
        let dx = Math.abs(this.velocityX) > 1 ? this.velocityX * dt / 1000 : 0;
        let dy = Math.abs(this.velocityY) > 1 ? this.velocityY * dt / 1000 : 0;
        this.entity.deltaMove(dx, dy);
        this.accelerationX = 0;
        this.accelerationY = 0;
        this.preVelocityX = this.velocityX;
        this.preVelocityY = this.velocityY;
        this.vpx = 0;
        this.vpy = 0;
        this.vmx = 0;
        this.vmy = 0;
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

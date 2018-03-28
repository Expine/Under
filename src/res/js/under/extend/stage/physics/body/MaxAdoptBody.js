/**
 * Max adopt body
 * Adopt the maximum for adding to the next speed
 * @implements {RigidBody}
 * @classdesc Body to ddopt the maximum for adding to the next speed
 */
class MaxAdoptBody extends RigidBody { // eslint-disable-line  no-unused-vars
    /**
     * Rigid body constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Positive x velocity vector to be added nextly
         * @protected
         * @type {number}
         */
        this.vpx = 0;
        /**
         * Positive y velocity vector to be added nextly
         * @protected
         * @type {number}
         */
        this.vpy = 0;
        /**
         * Negative x velocity vector to be added nextly
         * @protected
         * @type {number}
         */
        this.vmx = 0;
        /**
         * Negative y velocity vector to be added nextly
         * @protected
         * @type {number}
         */
        this.vmy = 0;
    }

    /**
     * Set the value added to the next speed vector
     * @override
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
            this.vpy = Math.max(this.vpy, vy);
        } else {
            this.vmy = Math.min(this.vmy, vy);
        }
    }

    /**
     * Apply force to objects
     * @override
     * @param {number} forceX Force in x direction
     * @param {number} forceY Force in y direction
     */
    enforce(forceX, forceY) {
        this.accelerationX += forceX / this.entity.material.mass;
        this.accelerationY += forceY / this.entity.material.mass;
    }

    /**
     * Get inertial force
     * @override
     * @return {data(.x, .y)} Inertial force x, y
     */
    getInertialForce() {
        let iv = {};
        iv.x = 0;
        iv.y = 0;
        for (let it of this.entity.collider.collisions) {
            if ((it.e1 === this.entity && it.e2.body !== undefined) || (it.e2 === this.entity && it.e1.body !== undefined)) {
                let you = it.e1 === this.entity ? it.e2 : it.e1;
                if (Math.abs(it.ny) > 0.5 && you.collider.getAABB().startY > this.entity.collider.getAABB().startY) {
                    let youIv = you.body.getInertialForce();
                    iv.x = Math.abs(iv.x) < Math.abs(youIv.x) ? youIv.x : iv.x;
                    iv.y = Math.abs(iv.y) < Math.abs(youIv.y) ? youIv.y : iv.y;
                }
            }
        }
        iv.x += this.preVelocityX;
        iv.y += this.preVelocityY;
        return iv;
    }

    /**
     * Update by rigid body
     * @override
     * @param {number} dt delta time
     */
    update(dt) {
        // next add velocity
        this.velocityX += this.vpx + this.vmx;
        this.velocityY += this.vpy + this.vmy;
        // enforce
        this.velocityX += this.accelerationX * dt / 1000;
        this.velocityY += this.accelerationY * dt / 1000;
        // air resistance
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
        // Inertial force
        let iv = this.getInertialForce();
        iv.x -= this.preVelocityX;
        iv.y -= this.preVelocityY;
        iv.x += this.velocityX;
        iv.y += this.velocityY;
        // move
        let dx = (iv.x) * dt / 1000;
        let dy = (iv.y) * dt / 1000;
        this.entity.deltaMove(dx, dy);
        // reserve velocity and acceleration
        this.preVelocityX = this.velocityX;
        this.preVelocityY = this.velocityY;
        this.preAccelerationX = this.accelerationX;
        this.preAccelerationY = this.accelerationY;
        // reset
        this.accelerationX = 0;
        this.accelerationY = 0;
        this.vpx = 0;
        this.vpy = 0;
        this.vmx = 0;
        this.vmy = 0;
    }
}

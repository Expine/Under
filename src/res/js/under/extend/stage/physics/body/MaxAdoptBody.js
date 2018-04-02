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

        /**
         * Previous x position
         * @protected
         * @type {number}
         */
        this.preX = 0;
        /**
         * Previous y position
         * @protected
         * @type {number}
         */
        this.preY = 0;
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
     * Reset rigid body state
     * @override
     */
    reset() {
        super.reset();
        this.vpx = 0;
        this.vpy = 0;
        this.vmx = 0;
        this.vmy = 0;
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
     * Update by rigid body
     * @override
     * @param {number} dt delta time
     */
    update(dt) {
        // set previous posiiton
        this.diffX = (this.entity.x - this.preX) * 1000 / dt;
        this.diffY = (this.entity.y - this.preY) * 1000 / dt;
        this.isFix = Math.abs(this.diffX) < 25 && Math.abs(this.diffY) < 50;
        this.preX = this.entity.x;
        this.preY = this.entity.y;

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
        // move
        let dx = this.velocityX * dt / 1000;
        let dy = this.velocityY * dt / 1000;
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

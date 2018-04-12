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
         * Internal current x velocity
         * @protected
         * @type {number}
         */
        this.internalVelocityX = this.velocityX;
        /**
         * Internal current y velocity
         * @protected
         * @type {number}
         */
        this.internalVelocityY = this.velocityY;
        /**
         * Internal current x acceleration
         * @protected
         * @type {number}
         */
        this.internalAccelerationX = this.accelerationX;
        /**
         * Internal current y acceleration
         * @protected
         * @type {number}
         */
        this.internalAccelerationY = this.accelerationY;

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
        this.internalVelocityX = 0;
        this.internalVelocityY = 0;
        this.internalAccelerationX = 0;
        this.internalAccelerationY = 0;
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
        this.internalAccelerationX += forceX / this.entity.material.mass;
        this.internalAccelerationY += forceY / this.entity.material.mass;
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
        this.isFixX = Math.abs(this.diffX) < 25;
        this.isFixY = Math.abs(this.diffY) < 50;
        this.preX = this.entity.x;
        this.preY = this.entity.y;

        // next add velocity
        this.internalVelocityX += this.vpx + this.vmx;
        this.internalVelocityY += this.vpy + this.vmy;
        // enforce
        this.internalVelocityX += this.internalAccelerationX * dt / 1000;
        this.internalVelocityY += this.internalAccelerationY * dt / 1000;
        // air resistance
        let kx = -this.internalVelocityX * this.k / this.entity.material.mass * dt / 1000;
        let ky = -this.internalVelocityY * this.k / this.entity.material.mass * dt / 1000;
        if (Math.abs(this.internalVelocityX) < Math.abs(kx)) {
            this.internalVelocityX = 0;
        } else {
            this.internalVelocityX += kx;
        }
        if (Math.abs(this.internalVelocityY) < Math.abs(ky)) {
            this.internalVelocityY = 0;
        } else {
            this.internalVelocityY += ky;
        }
        // move
        let dx = this.internalVelocityX * dt / 1000;
        let dy = this.internalVelocityY * dt / 1000;
        this.entity.deltaMove(dx, dy);
        // reserve velocity and acceleration
        this.velocityX = this.internalVelocityX;
        this.velocityY = this.internalVelocityY;
        this.accelerationX = this.internalAccelerationX;
        this.accelerationY = this.internalAccelerationY;
        // reset
        this.internalAccelerationX = 0;
        this.internalAccelerationY = 0;
        this.vpx = 0;
        this.vpy = 0;
        this.vmx = 0;
        this.vmy = 0;
    }
}

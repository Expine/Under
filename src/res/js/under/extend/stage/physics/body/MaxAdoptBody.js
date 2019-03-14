/**
 * Max adopt body
 * - Update entity by physical quantity
 * - ### Adopt the maximum for adding to the next speed
 * @extends {RigidBody}
 * @classdesc Max adopt body to adopt the maximum for adding to the next speed
 */
class MaxAdoptBody extends RigidBody {
    /**
     * Max adopt body constructor
     * @constructor
     * @param {boolean} fixed Whether push back is not performed
     */
    constructor(fixed) {
        super(fixed);

        /**
         * Internal current x acceleration
         * @protected
         * @type {number}
         */
        this.internalAccelerationX = 0;
        /**
         * Internal current y acceleration
         * @protected
         * @type {number}
         */
        this.internalAccelerationY = 0;

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
     * Update rigid body information
     * @override
     * @protected
     */
    updateInfo(dt) {
        super.updateInfo(dt);
        // set previous posiiton
        this.diffX = (this.entity.x - this.preX) * 1000 / dt;
        this.diffY = (this.entity.y - this.preY) * 1000 / dt;
        this.preX = this.entity.x;
        this.preY = this.entity.y;
    }

    /**
     * Update velocity
     * @override
     * @protected
     */
    updateVelocity(dt) {
        // next add velocity
        this.material.velocityX += this.vpx + this.vmx;
        this.material.velocityY += this.vpy + this.vmy;
        // enforce
        this.material.velocityX += this.internalAccelerationX * dt / 1000;
        this.material.velocityY += this.internalAccelerationY * dt / 1000;
        // air resistance
        const kx = -this.material.velocityX * this.material.k / this.entity.material.mass * dt / 1000;
        const ky = -this.material.velocityY * this.material.k / this.entity.material.mass * dt / 1000;
        if (Math.abs(this.material.velocityX) < Math.abs(kx)) {
            this.material.velocityX = 0;
        } else {
            this.material.velocityX += kx;
        }
        if (Math.abs(this.material.velocityY) < Math.abs(ky)) {
            this.material.velocityY = 0;
        } else {
            this.material.velocityY += ky;
        }
    }

    /**
     * Update entity by velocity
     * @override
     * @protected
     */
    updateEntity(dt) {
        // move
        const dx = this.material.velocityX * dt / 1000;
        const dy = this.material.velocityY * dt / 1000;
        this.entity.deltaMove(dx, dy);
    }

    /**
     * Cleanup body information
     * @override
     * @param {nuumber} dt Delta time
     */
    cleanup(dt) {
        this.material.accelerationX = this.internalAccelerationX;
        this.material.accelerationY = this.internalAccelerationY;
        this.internalAccelerationX = 0;
        this.internalAccelerationY = 0;
        this.vpx = 0;
        this.vpy = 0;
        this.vmx = 0;
        this.vmy = 0;
    }
}

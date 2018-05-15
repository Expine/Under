/**
 * Joint body
 * - Update entity by physical quantity
 * - Adopt the maximum for adding to the next speed
 * - ### Fits within a certain length range of some object
 * @extends {MaxAdoptBody}
 * @classdesc Joint body to fit within a certain length range of some object
 */
class JointBody extends PreciseBody { // eslint-disable-line  no-unused-vars
    /**
     * Joint body constructor
     * @constructor
     * @param {number} jointingX Jointing x position (object that attached it)
     * @param {number} jointingY Jointing y position (object that attached it)
     */
    constructor(jointingX, jointingY) {
        super();

        /**
         * Jointing x position
         * @protected
         * @type {number}
         */
        this.jointingX = jointingX;
        /**
         * Jointing y position
         * @protected
         * @type {number}
         */
        this.jointingY = jointingY;

        /**
         * Jointed entity
         * @protected
         * @type {Entity}
         */
        this.jointed = null;
        /**
         * Jointed x position
         * @protected
         * @type {number}
         */
        this.jointedX = 0;
        /**
         * Jointed y position
         * @protected
         * @type {number}
         */
        this.jointedY = 0;

        /**
         * Jointed length
         * @protected
         * @type {number}
         */
        this.length = 0;
    }

    /**
     * Joint to something
     * @override
     * @param {Entity} jointed Jointed entity
     * @param {number} jointedX Jointed x position
     * @param {number} jointedY Jointed y position
     * @param {number} length Jointed length
     */
    joint(jointed, jointedX, jointedY, length) {
        this.jointed = jointed;
        this.jointedX = jointedX;
        this.jointedY = jointedY;
        this.length = length;
    }

    /**
     * Unjoint
     * @override
     */
    unjoint() {
        this.jointed = null;
    }

    /**
     * Update velocity
     * @override
     * @protected
     */
    updateVelocity(dt) {
        if (this.jointed !== null) {
            if (this.jointed instanceof MutableEntity) {
                if (this.jointed.body !== null) {
                    this.material.velocityX = this.jointed.velocityX;
                    this.material.velocityY = this.jointed.velocityY;
                }
            } else {
                this.material.velocityX = 0;
                this.material.velocityY = 0;
            }
        } else {
            super.updateVelocity(dt);
        }
    }

    /**
     * Update entity by velocity
     * @override
     * @param {number} dt Delta time
     */
    updateEntity(dt) {
        super.updateEntity(dt);

        if (this.jointed !== null) {
            let ex = this.entity.directionX >= 0 ? this.entity.x + this.jointingX : this.entity.x + this.entity.width - this.jointingX;
            let ey = this.entity.directionY > 0 ? this.entity.y + this.jointingY : this.entity.y + this.entity.height - this.jointingY;
            let jx = this.jointed.directionX >= 0 ? this.jointed.x + this.jointedX : this.jointed.x + this.jointed.width - this.jointedX;
            let jy = this.jointed.directionY > 0 ? this.jointed.y + this.jointedY : this.jointed.y + this.jointed.height - this.jointedY;
            let dx = jx - ex;
            let dy = jy - ey;
            let d = Math.sqrt(dx * dx + dy * dy);
            if (d > this.length) {
                let l = d - this.length;
                for (let it of this.entity.collider.collisions) {
                    if ((it.colliding === this.entity && it.nx * dx > 0) || (it.collided === this.entity && it.nx * dx < 0)) {
                        if (this.length < Math.abs(dx)) {
                            dy = dy * d / l + Math.sign(dy);
                        }
                        dx = 0;
                    }
                    if ((it.colliding === this.entity && it.ny * dy > 0) || (it.collided === this.entity && it.ny * dy < 0)) {
                        if (this.length < Math.abs(dy)) {
                            dx = dx * d / l + Math.sign(dx);
                        }
                        dy = 0;
                    }
                }
                this.entity.deltaMove(l * dx / d, l * dy / d);
            }
        }
    }
}

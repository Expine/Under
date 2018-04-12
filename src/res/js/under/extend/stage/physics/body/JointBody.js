/**
 * Joint body
 * - Update entity by physical quantity
 * - Adopt the maximum for adding to the next speed
 * - ### Fits within a certain length range of some object
 * @implements {MaxAdoptBody}
 * @classdesc Joint body to fit within a certain length range of some object
 */
class JointBody extends MaxAdoptBody { // eslint-disable-line  no-unused-vars
    /**
     * Joint body constructor
     * @constructor
     * @param {number} jointingX Jointing x position (object that attached it)
     * @param {number} jointingY Jointing y position (object that attached it)
     * @param {Entity} jointed Jointed entity
     * @param {number} jointedX Jointed x position
     * @param {number} jointedY Jointed y position
     * @param {number} length Jointed length
     */
    constructor(jointingX, jointingY, jointed, jointedX, jointedY, length) {
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
        this.jointed = jointed;
        /**
         * Jointed x position
         * @protected
         * @type {number}
         */
        this.jointedX = jointedX;
        /**
         * Jointed y position
         * @protected
         * @type {number}
         */
        this.jointedY = jointedY;

        /**
         * Jointed length
         * @protected
         * @type {number}
         */
        this.length = length;
    }

    /**
     * Update by rigid body
     * @override
     * @param {number} dt delta time
     */
    update(dt) {
        super.update(dt);

        if (this.enable) {
            let ex = this.entity.directionX >= 0 ? this.entity.x + this.entity.width + this.jointingX : this.entity.x - this.jointingX;
            let ey = this.entity.directionY <= 0 ? this.entity.y - this.jointingY : this.entity.y + this.entity.height + this.jointingY;
            let jx = this.jointed.directionX >= 0 ? this.jointed.x + this.jointed.width + this.jointedX : this.jointed.x - this.jointedX;
            let jy = this.jointed.directionY >= 0 ? this.jointed.y + this.jointed.height + this.jointedY : this.jointed.y - this.jointedY;
            let dx = jx - ex;
            let dy = jy - ey;
            let d = Math.sqrt(dx * dx + dy * dy);
            if (d > this.length) {
                let l = d - this.length;
                for (let it of this.entity.collider.collisions) {
                    if ((it.e1 === this.entity && it.nx * dx > 0) || (it.e2 === this.entity && it.nx * dx < 0)) {
                        if (this.length < Math.abs(dx)) {
                            dy = dy * d / l + Math.sign(dy);
                        }
                        dx = 0;
                    }
                    if ((it.e1 === this.entity && it.ny * dy > 0) || (it.e2 === this.entity && it.ny * dy < 0)) {
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

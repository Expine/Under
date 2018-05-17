/**
 * Propeller jump state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - Basic information can be transferred to another state
 * - Render entity by entity own image ID for change type
 * - Sets max velocity and move power for moving
 * - Enable to set velocity and power
 * - ### It not transitate falling and can fly
 * @extends {UnderMovableState}
 * @classdesc Propeller jump state that can fly
 */
class PropellerJumpingState extends UnderMovableState { // eslint-disable-line  no-unused-vars
    /**
     * Propeller jump state constructor
     * @constructor
     * @param {number} maxVeocityX Maximum speed x vector
     * @param {number} maxVeocityY Maximum speed y vector
     * @param {number} movePowerX Force of x direction applied when moving
     * @param {number} movePowerY Force of y direction applied when moving
     */
    constructor(maxVelocityX, maxVelocityY, movePowerX, movePowerY) {
        super(maxVelocityX, maxVelocityY, movePowerX, movePowerY);

        /**
         * Amount of indicating difference of height
         * @protected
         * @type {number}
         */
        this.propellerDiffY = 8;
    }

    /**
     * Move y direction by input
     * @override
     * @protected
     * @param {number} vy y direction
     * @param {number} dt Delta time
     */
    moveY(vy, dt) {
        if (this.entity.body.velocityY * vy < 0 || Math.abs(this.entity.body.velocityY) < Math.abs(this.maxVelocityY)) {
            let power = vy == 1 ? this.movePowerY / 10 : this.movePowerY;
            this.entity.body.enforce(0, power * this.entity.material.mass * vy / dt);
        }
    }

    /**
     * Initialize state
     * @override
     */
    init() {
        super.init();
        if (this.entity.getImage() instanceof GameAnimation) {
            this.entity.getImage().restore();
        }
        let aabb = this.entity.collider.getAABB();
        this.entity.collider.fixBound(aabb.startX - this.entity.x, aabb.startY - this.propellerDiffY - this.entity.y, aabb.endX - this.entity.x, aabb.endY - this.entity.y);
    }

    /**
     * Update state
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        super.update(dt);
        if (this.entity.getImage() !== null) {
            this.entity.getImage().update(dt * 3);
        }
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        this.moveByInput(dt);
        if (Util.onGround(this.entity)) {
            this.transitionUsualState();
            // restore
            let aabb = this.entity.collider.getAABB();
            this.entity.collider.fixBound(aabb.startX - this.entity.x, aabb.startY + this.propellerDiffY - this.entity.y, aabb.endX - this.entity.x, aabb.endY - this.entity.y);
        }
        return true;
    }
}

/**
 * PropellerB jump state
 * - Determines the operation by AI according to the state and renders based on state
 * - Enable to set animation
 * - Base state for rendering state animation
 * - Basic information can be transferred to another state
 * - Render entity by entity own image ID for change type
 * - Sets max velocity and move power for moving
 * - Enable to set velocity and power
 * - ### It not transitate falling and can fly
 * @implements {UnderMovableState}
 * @classdesc PropellerB jump state that can fly
 */
class PropellerBJumpingState extends UnderMovableState { // eslint-disable-line  no-unused-vars
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
     * Update state
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        super.update(dt);
        if (this.stateAnimation !== null) {
            this.stateAnimation.update(dt * 4);
        }
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        this.moveByInput(dt);
        if (Util.onGround(this.entity)) {
            if (this.entity.body.isFixX) {
                this.ai.changeState(`stationary`);
            } else {
                this.ai.changeState(`walk`);
            }
        }
        return true;
    }
}

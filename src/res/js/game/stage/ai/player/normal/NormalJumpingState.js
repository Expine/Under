/**
 * Normal jumping state
 * - Determines the operation by AI according to the state and renders based on state
 * - Enable to set animation
 * - Base state for rendering state animation
 * - Basic information can be transferred to another state
 * - Render entity by entity own image ID for change type
 * - Sets max velocity and move power for moving
 * - Enable to set velocity and power
 * - ### To fall, walk and stop
 * @implements {UnderMovableState}
 * @classdesc Normal jumping state to fall, walk and stop
 */
class NormalJumpingState extends UnderMovableState { // eslint-disable-line  no-unused-vars
    /**
     * Normal jumping state constructor
     * @constructor
     * @param {number} maxVelocityX Maximum speed
     * @param {number} movePower The power to move in the air
     */
    constructor(maxVelocityX, movePower) {
        super(maxVelocityX, 0, movePower, 0);
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        // move
        this.moveByInput(dt);
        if (this.entity.body.velocityY > 0) {
            this.ai.changeState(`fall`);
        }
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

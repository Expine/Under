/**
 * Wild roll state
 * - Determines the operation by AI according to the state and renders based on state
 * - Enable to set animation
 * - Base state for rendering state animation
 * - Basic information can be transferred to another state
 * - Render entity by entity own image ID for change type
 * - Sets max velocity and move power for moving
 * - Enable to set velocity and power
 * - ### Prepares rolling action
 * @implements {UnderMovableState}
 * @classdesc Wild roll state to prepare rolling action
 */
class WildRollState extends UnderMovableState { // eslint-disable-line  no-unused-vars
    /**
     * Wild roll state constructor
     * @constructor
     * @param {number} movePowerX The power of x direction to move in the air
     * @param {number} movePowerY The power of y direction to move in the air
     */
    constructor(movePowerX, movePowerY) {
        super(0, 0, movePowerX, movePowerY);
    }

    /**
     * Initialize state
     * @override
     */
    init() {
        super.init();
        this.entity.body.setNextAddVelocity(-this.entity.body.velocityX, 0);
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        if (this.stateAnimation.isEnded()) {
            // big jump
            this.entity.body.enforce(this.movePowerX * this.entity.material.mass * this.entity.directionX / dt, -this.movePowerY * this.entity.material.mass / dt);
            this.ai.changeState(`rolling`);
        }
        return true;
    }
}

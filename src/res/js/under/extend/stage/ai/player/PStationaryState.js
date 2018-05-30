/**
 * Stationary state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - ### Moves, jumps, and attacks
 * @extends {BaseState}
 * @classdesc Stationary state to move, jump, and attack
 */
class PStationaryState extends BaseState { // eslint-disable-line  no-unused-vars
    /**
     * Player stationary state constructor
     * @constructor
     * @param {number} maxVelocityX Maximum speed
     * @param {number} walkPower The power to walk
     */
    constructor(maxVelocityX, walkPower) {
        super();

        /**
         * Maximum speed vector
         * @protected
         * @type {number}
         */
        this.maxVelocityX = maxVelocityX;
        /**
         * Force applied when moving
         * @protected
         * @type {number}
         */
        this.walkPower = walkPower;
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        let vx = 0;
        // walk
        if (Input.key.isPressed(Input.key.left())) {
            vx += -1;
        }
        if (Input.key.isPressed(Input.key.right())) {
            vx += 1;
        }
        if (vx !== 0) {
            this.entity.setDirection(vx);
            if (this.entity.body.velocityX * vx < 0 || Math.abs(this.entity.body.velocityX) < this.maxVelocityX) {
                this.entity.body.enforce(vx * this.walkPower * this.entity.material.mass / dt, 0);
            }
            this.ai.changeState(`walk`);
        }
        if (Util.onGround(this.entity)) {
            if (Input.key.isPressed(Input.key.up())) {
                this.ai.changeState(`jump`);
            }
            if (Input.key.isPress(Input.key.yes())) {
                this.ai.changeState(`attack`);
            }
        }
        return true;
    }
}

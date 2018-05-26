/**
 * Player walk state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - ### Walks, jumps, and attacks
 * @extends {BaseState}
 * @classdesc Player walk state to walk, jump and attack
 */
class PWalkState extends BaseState { // eslint-disable-line  no-unused-vars
    /**
     * Player walk state constructor
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
        // input
        let input = false;
        let vx = 0;
        // walk
        if (Input.key.isPressed(Input.key.left())) {
            vx += -1;
            input = true;
        }
        if (Input.key.isPressed(Input.key.right())) {
            vx += 1;
            input = true;
        }
        if (vx !== 0) {
            this.entity.setDirection(vx);
            if (this.entity.body.velocityX * vx < 0 || Math.abs(this.entity.body.velocityX) < this.maxVelocityX) {
                this.entity.body.enforce(vx * this.walkPower * this.entity.material.mass / dt, 0);
            }
        }
        // stationary
        if (!input) {
            this.ai.changeState(`stationary`);
        }
        if (Util.onGround(this.entity)) {
            // jump
            if (Input.key.isPressed(Input.key.up())) {
                this.ai.changeState(`walkjump`);
            }
            // punch
            if (Input.key.isPress(Input.key.yes())) {
                this.ai.changeState(`attack`);
            }
        }
        return true;
    }
}

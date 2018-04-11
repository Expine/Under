/**
 * State of player's stationary
 * @implements {BaseState}
 * @classdesc State of player's stationary
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
     * @param {number} dt - delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        let vx = 0;
        // walk
        if (Input.it.isPressed(Input.key.left())) {
            vx += -1;
        }
        if (Input.it.isPressed(Input.key.right())) {
            vx += 1;
        }
        if (vx != 0) {
            this.entity.directionX = vx;
            if (this.entity.body.preVelocityX * vx < 0 || Math.abs(this.entity.body.preVelocityX) < this.maxVelocityX) {
                this.entity.body.enforce(vx * this.walkPower / dt, 0);
            }
            this.ai.changeState(`walk`);
        }
        if (Input.it.isPressed(Input.key.up()) && Util.onGround(this.entity)) {
            this.ai.changeState(`jump`);
        }
        if (Input.it.isPress(Input.key.yes())) {
            this.ai.changeState(`attack`);
        }
        return true;
    }
}

/**
 * State of normal jumping
 * @implements {UnderPlayerState}
 * @classdesc State of normal jumping
 */
class NormalJumpingState extends UnderPlayerState { // eslint-disable-line  no-unused-vars
    /**
     * Normal jump state constructor
     * @constructor
     * @param {number} maxVelocityX Maximum speed
     * @param {number} movePower The power to move in the air
     */
    constructor(maxVelocityX, movePower) {
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
        this.movePower = movePower;
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt - delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        // input
        let vx = 0;
        if (Input.it.isLeftPressed()) {
            vx += -1;
        }
        if (Input.it.isRightPressed()) {
            vx += 1;
        }
        if (vx != 0) {
            this.entity.directionX = vx;
            if (this.entity.body.preVelocityX * vx < 0 || Math.abs(this.entity.body.preVelocityX) < Math.abs(this.maxVelocityX)) {
                this.entity.body.enforce(this.movePower * vx / dt, 0);
            }
        }
        if (Util.onGround(this.entity)) {
            if (Math.abs(this.entity.body.preVelocityX) < 10) {
                this.ai.changeState(`stationary`);
            } else {
                this.ai.changeState(`walk`);
            }
        }
        return true;
    }
}

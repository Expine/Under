/**
 * State of player's stationary
 * @implements {State}
 * @classdesc State of player's stationary
 */
class PStationaryState extends State { // eslint-disable-line  no-unused-vars
    /**
     * Player stationary state constructor
     * @constructor
     */
    constructor() {
        super(`stationary`);

        /**
         * Maximum speed vector
         * @type {number}
         */
        this.maxVelocityX = 300;
        /**
         * Force applied when moving
         * @type {number}
         */
        this.walkPower = 36000;
    }

    /**
     * Make walk state
     * @return {State} walk state
     */
    makeWalkState() {
        return new PWalkState();
    }

    /**
     * Make jump state
     * @return {State} jump state
     */
    makeJumpState() {
        return new PJumpState(230);
    }

    /**
     * Make attack state
     * @return {State} attack state
     */
    makeAttackState() {
        return new PPunchState();
    }
    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt - delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        let vx = 0;
        // walk
        if (Input.it.isLeftPressed()) {
            vx += -1;
        }
        if (Input.it.isRightPressed()) {
            vx += 1;
        }
        if (vx != 0) {
            this.entity.directionX = vx;
            if (this.entity.body.velocityX * vx < 0 || Math.abs(this.entity.body.velocityX) < this.maxVelocityX) {
                this.entity.body.enforce(vx * this.walkPower / dt, 0);
            }
            this.ai.changeState(this.makeWalkState());
        }
        if (Input.it.isUpPressed() && Util.onGround(this.entity)) {
            this.ai.changeState(this.makeJumpState());
        }
        if (Input.it.isYesPress()) {
            this.ai.changeState(this.makeAttackState());
        }
        return true;
    }
}

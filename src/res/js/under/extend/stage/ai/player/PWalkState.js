/**
 * State of walking player
 * @implements {State}
 * @classdesc State of walking player
 */
class PWalkState extends State { // eslint-disable-line  no-unused-vars
    /**
     * Player walk state constructor
     * @constructor
     */
    constructor() {
        super(`walk`);

        /**
         * Maximum speed vector
         * @type {number}
         */
        this.maxVelocityX = 300;
        /**
         * Force applied when moving
         * @type {number}
         */
        this.walkPower = 18000;
    }

    /**
     * Make stationary state
     * @return {State} stationary state
     */
    makeStationaryState() {
        return new PStationaryState();
    }

    /**
     * Make jump state
     * @return {State} jump state
     */
    makeJumpState() {
        return new PJumpState(300);
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
        // for animation
        this.stateCount += dt / 200;

        // input
        let input = false;
        let vx = 0;
        // walk
        if (Input.it.isLeftPressed()) {
            vx += -1;
            input = true;
        }
        if (Input.it.isRightPressed()) {
            vx += 1;
            input = true;
        }
        if (vx != 0) {
            this.entity.directionX = vx;
            if (this.entity.body.velocityX * vx < 0 || Math.abs(this.entity.body.velocityX) < this.maxVelocityX) {
                this.entity.body.enforce(vx * this.walkPower / dt, 0);
            }
        }
        // stationary
        if (!input && Math.abs(this.entity.body.velocityX) < 10) {
            this.ai.changeState(this.makeStationaryState());
        }
        // jump
        if (Input.it.isUpPressed() && Util.onGround(this.entity)) {
            this.ai.changeState(this.makeJumpState());
            input = true;
        }
        // punch
        if (Input.it.isYesPress()) {
            this.ai.changeState(this.makeAttackState());
            input = true;
        }
        return true;
    }
}

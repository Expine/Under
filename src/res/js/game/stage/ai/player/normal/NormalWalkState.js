/**
 * State of walking normally
 * @implements {UnderPlayerState}
 * @classdesc State of walking normally
 */
class NormalWalkState extends UnderPlayerState { // eslint-disable-line  no-unused-vars
    /**
     * Normal walk state constructor
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
            if (this.entity.body.preVelocityX * vx < 0 || Math.abs(this.entity.body.preVelocityX) < this.maxVelocityX) {
                this.entity.body.enforce(vx * this.walkPower / dt, 0);
            }
        }
        // stationary
        if (!input && Math.abs(this.entity.body.preVelocityX) < 10) {
            this.ai.changeState(`stationary`);
        }
        // grab
        if (Input.it.isDownPressed() && Util.onGround(this.entity)) {
            this.ai.changeState(`grab`);
        }
        // jump
        if (Input.it.isUpPressed() && Util.onGround(this.entity)) {
            this.ai.changeState(`walkjump`);
            input = true;
        }
        // punch
        if (Input.it.isYesPress()) {
            this.ai.changeState(`attack`);
            input = true;
        }
        return true;
    }
}

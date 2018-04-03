/**
 * State of walking player
 * @implements {BaseState}
 * @classdesc State of walking player
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
     * @param {number} dt - delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        // input
        let input = false;
        let vx = 0;
        // walk
        if (Input.it.isKeyPressed(Input.it.left)) {
            vx += -1;
            input = true;
        }
        if (Input.it.isKeyPressed(Input.it.right)) {
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
        if (!input && this.entity.body.isFixX) {
            this.ai.changeState(`stationary`);
        }
        // jump
        if (Input.it.isKeyPressed(Input.it.up) && Util.onGround(this.entity)) {
            this.ai.changeState(`walkjump`);
            input = true;
        }
        // punch
        if (Input.it.isKeyPress(Input.it.yes)) {
            this.ai.changeState(`attack`);
            input = true;
        }
        return true;
    }
}

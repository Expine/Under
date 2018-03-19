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
        super();

        /**
         * Maximum speed vector
         * @protected
         * @type {number}
         */
        this.maxVelocityX = 300;
        /**
         * Force applied when moving
         * @protected
         * @type {number}
         */
        this.walkPower = 36000;
    }

    /**
     * Make walk state
     * @protected
     * @return {State} walk state
     */
    makeWalkState() {
        return new PWalkState();
    }

    /**
     * Make jump state
     * @protected
     * @return {State} jump state
     */
    makeJumpState() {
        return new PJumpState(230);
    }

    /**
     * Make attack state
     * @protected
     * @return {State} attack state
     */
    makeAttackState() {
        return new PPunchState();
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
        if (Input.it.isLeftPressed()) {
            vx += -1;
        }
        if (Input.it.isRightPressed()) {
            vx += 1;
        }
        if (vx != 0) {
            this.entity.directionX = vx;
            if (this.entity.body.preVelocityX * vx < 0 || Math.abs(this.entity.body.preVelocityX) < this.maxVelocityX) {
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

    /**
     * Render entity by this state
     * @override
     * @param {Context} ctx - canvas context
     * @param {number} [shiftX = 0] shift x position
     * @param {number} [shiftY = 0] shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        ctx.drawImage(this.entity.imageID, this.entity.x + shiftX, this.entity.y + shiftY, this.entity.width, this.entity.height, 0, 16 - this.entity.directionX * 16, 32, 32);
    }
}

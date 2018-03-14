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
        super();

        /**
         * Count for animation
         * @type {number}
         */
        this.walkCount_ = 0;

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
        this.walkCount_ += dt / 200;

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
            this.entity.direction = vx;
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

    /**
     * Render entity by this state
     * @override
     * @param {Context} ctx - canvas context
     * @param {number} [shiftX = 0] shift x position
     * @param {number} [shiftY = 0] shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        ctx.drawImage(this.entity.imageID, (Math.floor(this.walkCount_) % 4) * 32, 16 - this.entity.direction * 16, 32, 32, this.entity.x + shiftX, this.entity.y + shiftY, this.entity.width, this.entity.height);
    }
}

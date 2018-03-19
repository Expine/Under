/**
 * State of player punching
 * @implements {State}
 * @classdesc State of player punching
 */
class PPunchState extends State { // eslint-disable-line  no-unused-vars
    /**
     * Make stationary state
     * @protected
     * @return {State} stationary state
     */
    makeStationaryState() {
        return new PStationaryState();
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
     * Make attack object
     * @protected
     * @return {AttackObject} Attack object
     */
    makeAttackObject() {
        return new PunchObject(this.entity.x + this.entity.directionX * (this.entity.width + 10), this.entity.y);
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt - delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        // punch
        this.entity.stage.addEntity(this.makeAttackObject());
        // change state
        if (Math.abs(this.entity.body.preVelocityX) < 10) {
            this.ai.changeState(this.makeStationaryState());
        } else {
            this.ai.changeState(this.makeWalkState());
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
        ctx.drawImage(this.entity.imageID, this.entity.x + shiftX, this.entity.y + shiftY, this.entity.width, this.entity.height, 96, 16 - this.entity.directionX * 16, 32, 32);
    }
}

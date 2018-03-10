/**
 * State of player punching
 * @implements {State}
 * @classdesc State of player punching
 */
class PPunchState extends State { // eslint-disable-line  no-unused-vars
    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt - delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        // punch
        this.entity.stage.addEntity(new PunchObject(this.entity.x + this.entity.direction * (this.entity.width + 10), this.entity.y));
        // change state
        if (Math.abs(this.entity.body.velocityX) < 10) {
            this.ai.changeState(new PStationaryState());
        } else {
            this.ai.changeState(new PWalkState());
        }
        return true;
    }

    /**
     * Render entity by this tate
     * @override
     * @param {Context} ctx - canvas context
     * @param {number} [shiftX = 0] shift x position
     * @param {number} [shiftY = 0] shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        ctx.drawImage(this.entity.imageID, 96, 16 - this.entity.direction * 16, 32, 32, this.entity.x + shiftX, this.entity.y + shiftY, this.entity.width, this.entity.height);
    }
}

/**
 * State of player's stationary
 * @implements {State}
 * @classdesc State of player's stationary
 */
class PStationaryState extends State { // eslint-disable-line  no-unused-vars
    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt - delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        let vx = 0;
        if (Input.it.isLeftPressed()) {
            vx += -300;
        }
        if (Input.it.isRightPressed()) {
            vx += 300;
        }
        if (Math.abs(vx) > 0) {
            if (this.entity.body.velocityX * vx < 0 || Math.abs(this.entity.body.velocityX) < Math.abs(vx)) {
                this.entity.body.enforce(vx * 120 / dt, 0);
            } else {
                this.entity.body.velocityX = vx;
            }
            this.ai.changeState(new PWalkState());
        }
        if (Input.it.isUpPressed() && Util.onGround(this.entity)) {
            this.ai.changeState(new PJumpState(230));
        }
        /*
        if (Input.it.isYesPress()) {
            for (let it of this.entity.collider.collisions) {
                if (it.e1 instanceof Enemy) {
                    it.e1.damage(1);
                }
                if (it.e2 instanceof Enemy) {
                    it.e2.damage(1);
                }
            }
        }
        */
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
        ctx.drawImage(this.entity.imageID, 0, 0, 32, 32, this.entity.x + shiftX, this.entity.y + shiftY, this.entity.width, this.entity.height);
    }
}
